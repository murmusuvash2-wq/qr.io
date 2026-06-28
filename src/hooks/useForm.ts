import { useState, useCallback, FormEvent } from "react";

export type ValidationRules<T> = {
  [K in keyof T]?: {
    required?: boolean | string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
    validate?: (value: T[K], values: T) => string | undefined;
  };
};

export interface UseFormOptions<T extends Record<string, any>> {
  initialValues: T;
  validation?: ValidationRules<T>;
  onSubmit: (values: T) => void | Promise<void>;
}

export function useForm<T extends Record<string, any>>({ initialValues, validation, onSubmit }: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);

  const validateField = useCallback((name: keyof T, value: any): string | undefined => {
    if (!validation?.[name]) return undefined;
    const rules = validation[name]!;
    if (rules.required && !value) return typeof rules.required === "string" ? rules.required : `${String(name)} is required`;
    if (rules.minLength && String(value).length < rules.minLength.value) return rules.minLength.message;
    if (rules.maxLength && String(value).length > rules.maxLength.value) return rules.maxLength.message;
    if (rules.pattern && !rules.pattern.value.test(String(value))) return rules.pattern.message;
    if (rules.validate) return rules.validate(value, values);
    return undefined;
  }, [validation, values]);

  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  const setFieldTouched = useCallback((name: keyof T) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, [validateField, values]);

  const validateAll = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let valid = true;
    for (const key in validation) {
      const error = validateField(key, values[key]);
      if (error) { newErrors[key] = error; valid = false; }
    }
    setErrors(newErrors);
    setTouched(Object.keys(initialValues).reduce((acc, key) => ({ ...acc, [key]: true }), {} as any));
    return valid;
  }, [validation, values, validateField, initialValues]);

  const handleSubmit = useCallback(async (e?: FormEvent) => {
    e?.preventDefault();
    if (!validateAll()) return;
    setSubmitting(true);
    try { await onSubmit(values); } finally { setSubmitting(false); }
  }, [validateAll, onSubmit, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values, errors, touched, submitting,
    setFieldValue, setFieldTouched, handleSubmit, reset, validateAll,
  } as const;
}
