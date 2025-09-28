import React, { useEffect } from 'react';

interface KeyboardNavigationProps {
  onAddTask: () => void;
  onToggleFocus: () => void;
  onToggleSettings: () => void;
  onToggleTheme: () => void;
  children?: React.ReactNode;
}

const KeyboardNavigation: React.FC<KeyboardNavigationProps> = ({
  onAddTask,
  onToggleFocus,
  onToggleSettings,
  onToggleTheme,
  children
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
        return;
      }

      // Global keyboard shortcuts
      switch (event.key) {
        case 'n':
        case 'N':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            onAddTask();
          }
          break;
          
        case 'f':
        case 'F':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            onToggleFocus();
          }
          break;
          
        case ',':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            onToggleSettings();
          }
          break;
          
        case 'd':
        case 'D':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            onToggleTheme();
          }
          break;

        case 'Escape':
          // Close any open modals/panels
          const escapeEvent = new CustomEvent('keyboard-escape');
          document.dispatchEvent(escapeEvent);
          break;

        case '?':
          if (event.shiftKey) {
            event.preventDefault();
            // Show keyboard shortcuts help
            const helpEvent = new CustomEvent('show-keyboard-help');
            document.dispatchEvent(helpEvent);
          }
          break;

        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onAddTask, onToggleFocus, onToggleSettings, onToggleTheme]);

  return (
    <>
      {children}
      
      {/* Screen reader instructions */}
      <div className="sr-only" aria-live="polite">
        DoaList keyboard navigation: 
        Ctrl+N to add task, 
        Ctrl+F for focus mode, 
        Ctrl+comma for settings, 
        Ctrl+D for theme toggle,
        Shift+? for help.
        Use Tab and arrow keys to navigate between elements.
      </div>
      
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        Skip to main content
      </a>
    </>
  );
};

export default KeyboardNavigation;