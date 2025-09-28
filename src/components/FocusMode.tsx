import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  X, 
  ArrowLeft, 
  ArrowRight, 
  LogOut,
  Flag,
  Calendar,
  Briefcase,
  GraduationCap,
  User
} from 'lucide-react';
import { Task } from './DoaList';

interface FocusModeProps {
  tasks: Task[];
  currentTaskIndex: number;
  onTaskComplete: (taskId: string) => void;
  onTaskDelete: (taskId: string) => void;
  onNextTask: () => void;
  onPreviousTask: () => void;
  onExitFocus: () => void;
  settings: any;
  language: any;
}

const FocusMode: React.FC<FocusModeProps> = ({
  tasks,
  currentTaskIndex,
  onTaskComplete,
  onTaskDelete,
  onNextTask,
  onPreviousTask,
  onExitFocus,
  settings,
  language
}) => {
  // Keyboard navigation for focus mode
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case ' ':
        case 'Enter':
          if (tasks[currentTaskIndex]) {
            event.preventDefault();
            onTaskComplete(tasks[currentTaskIndex].id);
          }
          break;
        case 'Delete':
        case 'Backspace':
          if (tasks[currentTaskIndex]) {
            event.preventDefault();
            onTaskDelete(tasks[currentTaskIndex].id);
          }
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          onPreviousTask();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          onNextTask();
          break;
        case 'Escape':
          event.preventDefault();
          onExitFocus();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [tasks, currentTaskIndex, onTaskComplete, onTaskDelete, onNextTask, onPreviousTask, onExitFocus]);
  if (tasks.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="focus-mode text-center space-y-6 max-w-md w-full">
          <h1 className="text-2xl font-bold">Focus Mode</h1>
          <p className="text-muted-foreground">No pending tasks. Great job!</p>
          <Button onClick={onExitFocus} className="touch-target">
            <LogOut className="h-4 w-4 mr-2" />
            Exit Focus Mode
          </Button>
        </Card>
      </div>
    );
  }

  const currentTask = tasks[currentTaskIndex];
  const progress = ((currentTaskIndex + 1) / tasks.length) * 100;

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: Task['category']) => {
    switch (category) {
      case 'work': return <Briefcase className="h-4 w-4" />;
      case 'school': return <GraduationCap className="h-4 w-4" />;
      case 'personal': return <User className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const formatDate = (date: Date) => {
    if (settings.timeFormat === '24h') {
      return date.toLocaleString(settings.language, { 
        hour12: false,
        dateStyle: 'medium',
        timeStyle: 'short'
      });
    }
    return date.toLocaleString(settings.language, { 
      hour12: true,
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Focus Mode</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Task {currentTaskIndex + 1} of {tasks.length}</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={currentTaskIndex + 1}
              aria-valuemin={1}
              aria-valuemax={tasks.length}
              aria-label={`Task ${currentTaskIndex + 1} of ${tasks.length}`}
            />
          </div>
        </div>

        {/* Current Task */}
        <Card className="focus-mode text-center space-y-6 p-8">
          {/* Task Text */}
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold leading-relaxed">
              {currentTask.text}
            </h2>
            
            {/* Task Metadata */}
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className={`${getPriorityColor(currentTask.priority)} text-sm`}>
                <Flag className="h-3 w-3 mr-1" />
                {currentTask.priority} priority
              </Badge>
              
              <Badge variant="outline" className="text-sm">
                {getCategoryIcon(currentTask.category)}
                <span className="ml-1">{currentTask.category}</span>
              </Badge>
            </div>

            {/* Due Date */}
            {currentTask.dueDate && (
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Due: {formatDate(currentTask.dueDate)}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              onClick={() => onTaskComplete(currentTask.id)}
              className="touch-target-lg flex-1 sm:flex-none min-w-[140px]"
            >
              <Check className="h-5 w-5 mr-2" />
              Complete
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => onTaskDelete(currentTask.id)}
              className="touch-target-lg flex-1 sm:flex-none min-w-[140px]"
            >
              <X className="h-5 w-5 mr-2" />
              Delete
            </Button>
          </div>
        </Card>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={onPreviousTask}
            disabled={currentTaskIndex === 0}
            className="touch-target"
            aria-label="Previous task"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button
            variant="ghost"
            onClick={onExitFocus}
            className="touch-target"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Exit Focus
          </Button>
          
          <Button
            variant="outline"
            onClick={onNextTask}
            disabled={currentTaskIndex === tasks.length - 1}
            className="touch-target"
            aria-label="Next task"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Keyboard Shortcuts */}
        <Card className="p-4 bg-muted/50">
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <h3 className="font-medium">Keyboard Shortcuts</h3>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <span><kbd className="px-1 py-0.5 bg-background rounded">Space</kbd> Complete</span>
              <span><kbd className="px-1 py-0.5 bg-background rounded">Delete</kbd> Remove</span>
              <span><kbd className="px-1 py-0.5 bg-background rounded">←</kbd> Previous</span>
              <span><kbd className="px-1 py-0.5 bg-background rounded">→</kbd> Next</span>
              <span><kbd className="px-1 py-0.5 bg-background rounded">Esc</kbd> Exit</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Screen Reader Announcements */}
      <div className="sr-only" aria-live="polite">
        Currently focusing on task: {currentTask.text}. 
        Priority: {currentTask.priority}. 
        Category: {currentTask.category}.
        {currentTask.dueDate && `Due date: ${formatDate(currentTask.dueDate)}.`}
        Task {currentTaskIndex + 1} of {tasks.length}.
      </div>
    </div>
  );
};

export default FocusMode;