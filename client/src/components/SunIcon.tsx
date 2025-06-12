interface SunIconProps {
  className?: string;
}

export function SunIcon({ className = "w-8 h-8" }: SunIconProps) {
  return (
    <div className={`bg-sunman-yellow rounded-full flex items-center justify-center ${className}`}>
      <svg 
        className="w-1/2 h-1/2 text-sunman-blue" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="4" fill="currentColor"/>
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    </div>
  );
}
