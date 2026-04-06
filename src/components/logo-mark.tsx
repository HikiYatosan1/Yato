import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <img
      src="/brand/logo-avanta.png"
      alt="Аванта Телеком"
      className={cn("h-10 w-auto object-contain sm:h-12", className)}
    />
  );
}

