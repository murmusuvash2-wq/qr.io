import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, increment, collection, getDocs, deleteDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json'; // Make sure the path is correct depending on where the config is generated
import { generateTemplatesForTool, FLAGSHIP_TOOLS, registerEventLoggerCallback, TemplateTrackingEvent } from './templates-generator';

const isFirebaseConfigured = !!firebaseConfig && !!firebaseConfig.projectId;

let app;
let auth: ReturnType<typeof getAuth> | null = null;
export let db: ReturnType<typeof getFirestore> | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    // In strict mode or when using multiple DBs, pass databaseId
    db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);
    console.log("Firebase initialized successfully inside container.");
  } catch (e) {
    console.warn("Failed to complete Firebase SDK initialization, falling back to secure simulated engine:", e);
  }
}


export interface UserStats {
  email: string;
  uid: string;
  isPro: boolean;
  planType: 'monthly' | 'yearly' | 'free';
  expiryDate: string;
  totalGenerated: number;
  createdAt: string;
  country: string;
  currency: string;
}

// Local simulation fallback store helpers
const MOCK_AUTH_KEY = 'ezqr_secure_auth';
const MOCK_USER_KEY = 'ezqr_secure_user_doc';

const loadMockUserDoc = (email: string, country: string = 'US'): UserStats => {
  const isIndia = country === 'IN';
  const item = localStorage.getItem(MOCK_USER_KEY);
  if (item) {
    try {
      const parsed = JSON.parse(item);
      if (parsed.email === email) {
        if (email.toLowerCase() === 'test@ezqr.io') {
          parsed.isPro = true;
          parsed.planType = 'yearly';
        }
        return parsed;
      }
    } catch {}
  }
  const isTestUser = email.toLowerCase() === 'test@ezqr.io';
  const newUser: UserStats = {
    email,
    uid: isTestUser ? 'usr_test_pro_123' : 'usr_' + Math.random().toString(36).substr(2, 9),
    isPro: isTestUser,
    planType: isTestUser ? 'yearly' : 'free',
    expiryDate: isTestUser ? new Date(Date.now() + 31536000000).toISOString() : '',
    totalGenerated: isTestUser ? 12 : 0,
    createdAt: new Date().toISOString(),
    country,
    currency: isIndia ? 'INR' : 'USD'
  };
  localStorage.setItem(MOCK_USER_KEY, JSON.stringify(newUser));
  return newUser;
};

const saveMockUserDoc = (docData: UserStats) => {
  localStorage.setItem(MOCK_USER_KEY, JSON.stringify(docData));
};

// Unified Secure App Bridge to combine actual Firestore and robust Offline Fallblocks
export const authService = {
  isRealFirebase: isFirebaseConfigured,

  async registerUser(email: string, pass: string, country: string): Promise<UserStats> {
    const isIndia = country === 'IN';
    const currency = isIndia ? 'INR' : 'USD';
    
    if (isFirebaseConfigured && auth && db) {
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        const userDoc: UserStats = {
          email,
          uid: cred.user.uid,
          isPro: false,
          planType: 'free',
          expiryDate: '',
          totalGenerated: 0,
          createdAt: new Date().toISOString(),
          country,
          currency
        };
        await setDoc(doc(db, 'users', cred.user.uid), userDoc);
        localStorage.setItem('isUserPremiumPro', 'false');
        return userDoc;
      } catch (err: any) {
        if (err.code === 'auth/operation-not-allowed') {
          throw new Error('Email/Password Auth is disabled. Enable it in Firebase Console -> Authentication -> Sign-in method.');
        }
        throw new Error(err.message || 'Registration failed');
      }
    } else {
      // Robust simulation registry
      const simulatedDoc = loadMockUserDoc(email, country);
      localStorage.setItem(MOCK_AUTH_KEY, email);
      localStorage.setItem('isUserPremiumPro', simulatedDoc.isPro ? 'true' : 'false');
      return simulatedDoc;
    }
  },

  async loginUser(email: string, pass: string): Promise<UserStats> {
    if (isFirebaseConfigured && auth && db) {
      try {
        let cred;
        try {
          cred = await signInWithEmailAndPassword(auth, email, pass);
        } catch (err: any) {
          if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
            try {
              cred = await createUserWithEmailAndPassword(auth, email, pass);
            } catch (creationErr) {
              throw err;
            }
          } else {
            throw err;
          }
        }
        const snap = await getDoc(doc(db, 'users', cred.user.uid));
        if (snap.exists()) {
          const fetched = snap.data() as UserStats;
          localStorage.setItem('isUserPremiumPro', fetched.isPro ? 'true' : 'false');
          return fetched;
        } else {
          const userDoc: UserStats = {
            email,
            uid: cred.user.uid,
            isPro: false,
            planType: 'free',
            expiryDate: '',
            totalGenerated: 1,
            createdAt: new Date().toISOString(),
            country: 'US',
            currency: 'USD'
          };
          await setDoc(doc(db, 'users', cred.user.uid), userDoc);
          localStorage.setItem('isUserPremiumPro', 'false');
          return userDoc;
        }
      } catch (err : any) {
        if (err.code === 'auth/operation-not-allowed') {
          throw new Error('Email/Password Auth is disabled. Enable it in Firebase Console -> Authentication -> Sign-in method.');
        }
        throw new Error(err.message || 'Authenticating credentials failed');
      }
    } else {
      localStorage.setItem(MOCK_AUTH_KEY, email);
      const simulatedDoc = loadMockUserDoc(email);
      localStorage.setItem('isUserPremiumPro', simulatedDoc.isPro ? 'true' : 'false');
      return simulatedDoc;
    }
  },

  async logout(): Promise<void> {
    localStorage.setItem('isUserPremiumPro', 'false');
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    } else {
      localStorage.removeItem(MOCK_AUTH_KEY);
    }
  },

  async getCurrentUser(offlineEmail?: string): Promise<UserStats | null> {
    if (isFirebaseConfigured && auth && db) {
      const current = auth.currentUser;
      if (current) {
        const snap = await getDoc(doc(db, 'users', current.uid));
        if (snap.exists()) {
          const fetched = snap.data() as UserStats;
          localStorage.setItem('isUserPremiumPro', fetched.isPro ? 'true' : 'false');
          return fetched;
        }
      }
      return null;
    } else {
      const stored = offlineEmail || localStorage.getItem(MOCK_AUTH_KEY);
      if (stored) {
        const simulatedDoc = loadMockUserDoc(stored);
        localStorage.setItem('isUserPremiumPro', simulatedDoc.isPro ? 'true' : 'false');
        return simulatedDoc;
      }
      return null;
    }
  },

  async recordGeneration(uid: string): Promise<number> {
    if (isFirebaseConfigured && db) {
      try {
        const ref = doc(db, 'users', uid);
        await updateDoc(ref, {
          totalGenerated: increment(1)
        });
        const snap = await getDoc(ref);
        return snap.exists() ? (snap.data() as UserStats).totalGenerated : 1;
      } catch {
        return 1;
      }
    } else {
      const docItem = localStorage.getItem(MOCK_USER_KEY);
      if (docItem) {
        try {
          const parsed = JSON.parse(docItem);
          parsed.totalGenerated += 1;
          saveMockUserDoc(parsed);
          return parsed.totalGenerated;
        } catch {}
      }
      return 1;
    }
  },

  async upgradeUserToPro(uid: string, planType: 'monthly' | 'yearly', country: string): Promise<UserStats> {
    const monthsMultiplier = planType === 'yearly' ? 12 : 1;
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + monthsMultiplier);
    const expiryISO = expiry.toISOString();
    
    if (isFirebaseConfigured && db) {
      const ref = doc(db, 'users', uid);
      const updatePayload = {
        isPro: true,
        planType,
        expiryDate: expiryISO,
        country
      };
      await updateDoc(ref, updatePayload);
      const snap = await getDoc(ref);
      localStorage.setItem('isUserPremiumPro', 'true');
      return snap.data() as UserStats;
    } else {
      const docItem = localStorage.getItem(MOCK_USER_KEY);
      if (docItem) {
        try {
          const parsed = JSON.parse(docItem) as UserStats;
          parsed.isPro = true;
          parsed.planType = planType;
          parsed.expiryDate = expiryISO;
          parsed.country = country;
          parsed.currency = country === 'IN' ? 'INR' : 'USD';
          saveMockUserDoc(parsed);
          localStorage.setItem('isUserPremiumPro', 'true');
          return parsed;
        } catch {}
      }
      throw new Error("Could not find user profile data.");
    }
  }
};

export interface TemplateDesign {
  id: string;
  title: string;
  category: string;
  type: 'Pro' | 'Free';
  description: string;
  bgType: 'gradient' | 'image';
  gradient?: {
    from: string;
    to: string;
    via?: string;
    angle: string;
  };
  imageSearchTerm?: string;
  imgUrl?: string;
  qrConfig: {
    fgColor: string;
    bgColor: string;
    dotsStyle: string;
    cornersStyle: string;
  };
  layoutType?: string;
  visualOverlay?: {
    themeType: string;
    texture: boolean;
    borderStyle: string;
    emojis?: Array<{ char: string; x: number; y: number; size: number }>;
    svgPaths?: Array<{ d: string; stroke: string; strokeWidth: number; fill: string; opacity: number }>;
  };
  textElements: Array<{
    content: string;
    x: number;
    y: number;
    color: string;
    fontSize: number;
  }>;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  approvedAt?: string;
  toolId?: string;
  toolName?: string;
  version?: string;
  seoTitle?: string;
  metaDescription?: string;
  urlSlug?: string;
  keywords?: string;
  jsonLdSchema?: string;
}

const LOCAL_TEMPLATES_KEY = 'ezqr_templates_v1';

export const templateService = {
  async getTemplates(): Promise<TemplateDesign[]> {
    let list: TemplateDesign[] = [];
    if (isFirebaseConfigured && db) {
      try {
        const colRef = collection(db, 'templates');
        const snap = await getDocs(colRef);
        snap.forEach((docSnap) => {
          list.push(docSnap.data() as TemplateDesign);
        });
      } catch (err) {
        console.warn("Failed to fetch templates from Firestore, using local fallback:", err);
      }
    }

    if (list.length === 0) {
      const local = localStorage.getItem(LOCAL_TEMPLATES_KEY);
      if (local) {
        try {
          list = JSON.parse(local) as TemplateDesign[];
        } catch {}
      }
    }

    // Merge high-quality programmatic factory templates for all 10 flagship tools
    FLAGSHIP_TOOLS.forEach((toolId) => {
      const dynamicPack = generateTemplatesForTool(toolId);
      dynamicPack.forEach((tpl) => {
        // Only append if it doesn't already exist to prevent overwriting user edits
        if (!list.some(existing => existing.id === tpl.id)) {
          list.push(tpl);
        }
      });
    });

    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async saveTemplate(template: TemplateDesign): Promise<void> {
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'templates', template.id), template);
        return;
      } catch (err) {
        console.warn("Failed to save template to Firestore, saving locally:", err);
      }
    }

    const list = await this.getTemplates();
    const existingIdx = list.findIndex(t => t.id === template.id);
    if (existingIdx >= 0) {
      list[existingIdx] = template;
    } else {
      list.push(template);
    }
    localStorage.setItem(LOCAL_TEMPLATES_KEY, JSON.stringify(list));
  },

  async saveTemplatesBatch(templates: TemplateDesign[]): Promise<void> {
    for (const t of templates) {
      await this.saveTemplate(t);
    }
  },

  async approveTemplate(templateId: string): Promise<void> {
    const list = await this.getTemplates();
    const found = list.find(t => t.id === templateId);
    if (found) {
      found.status = 'approved';
      found.approvedAt = new Date().toISOString();
      await this.saveTemplate(found);
    }
  },

  async rejectTemplate(templateId: string): Promise<void> {
    const list = await this.getTemplates();
    const found = list.find(t => t.id === templateId);
    if (found) {
      found.status = 'rejected';
      await this.saveTemplate(found);
    }
  },

  async updateTemplateCategory(templateId: string, category: string): Promise<void> {
    const list = await this.getTemplates();
    const found = list.find(t => t.id === templateId);
    if (found) {
      found.category = category;
      await this.saveTemplate(found);
    }
  },

  async deleteTemplate(templateId: string): Promise<void> {
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'templates', templateId));
      } catch (err) {
        console.warn("Failed to delete template from Firestore:", err);
      }
    }
    const list = await this.getTemplates();
    const filtered = list.filter(t => t.id !== templateId);
    localStorage.setItem(LOCAL_TEMPLATES_KEY, JSON.stringify(filtered));
  }
};

// Continuous Telemetry Syncer with Firestore
if (isFirebaseConfigured && db) {
  try {
    registerEventLoggerCallback(async (event: TemplateTrackingEvent) => {
      try {
        const eventRef = doc(db!, 'template_events', event.id);
        await setDoc(eventRef, event);
        console.log(`[Durable Telemetry] Event ${event.id} (${event.eventType}) successfully written to Firestore.`);
      } catch (err) {
        console.warn("Could not sync telemetry log to Firestore, fallback cache remains active:", err);
      }
    });
  } catch (err) {
    console.warn("Failed to subscribe persistent telemetry channel:", err);
  }
}

