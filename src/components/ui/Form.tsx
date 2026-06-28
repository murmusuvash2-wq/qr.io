import React from "react";
import { cn } from "../../lib/utils";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
  className?: string;
}

export function Form({ onSubmit, loading, children, className, ...props }: FormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-4", className)}
      noValidate
      {...props}
    >
      <fieldset disabled={loading} className="flex flex-col gap-4 border-0 p-0 m-0">
        {children}
      </fieldset>
    </form>
  );
}
