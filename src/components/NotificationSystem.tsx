import React from 'react';
import { Button } from '@/components/ui/button';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface NotificationSystemProps {
  notification: {
    type: 'success' | 'error' | 'info';
    message: string;
  } | null;
  onClose: () => void;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notification,
  onClose
}) => {
  if (!notification) return null;

  const getIcon = () => {
    switch (notification.type) {
      case 'success': return <CheckCircle className="h-5 w-5" />;
      case 'error': return <AlertCircle className="h-5 w-5" />;
      case 'info': return <Info className="h-5 w-5" />;
      default: return <Info className="h-5 w-5" />;
    }
  };

  const getNotificationClass = () => {
    switch (notification.type) {
      case 'success': return 'notification notification-success';
      case 'error': return 'notification notification-error';
      case 'info': return 'notification notification-info';
      default: return 'notification notification-info';
    }
  };

  return (
    <div 
      className={getNotificationClass()}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="touch-target p-1 h-6 w-6 flex-shrink-0"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default NotificationSystem;