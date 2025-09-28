import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  X, 
  Edit, 
  Calendar,
  Flag,
  Briefcase,
  GraduationCap,
  User
} from 'lucide-react';
import { Task } from './DoaList';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  settings: any;
  language: any;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onToggle, 
  onDelete, 
  settings,
  language 
}) => {
  const [isEditing, setIsEditing] = useState(false);

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
      case 'work': return <Briefcase className="h-3 w-3" />;
      case 'school': return <GraduationCap className="h-3 w-3" />;
      case 'personal': return <User className="h-3 w-3" />;
      default: return <User className="h-3 w-3" />;
    }
  };

  const formatDate = (date: Date) => {
    if (settings.timeFormat === '24h') {
      return date.toLocaleString(settings.language, { 
        hour12: false,
        dateStyle: 'short',
        timeStyle: 'short'
      });
    }
    return date.toLocaleString(settings.language, { 
      hour12: true,
      dateStyle: 'short',
      timeStyle: 'short'
    });
  };

  return (
    <Card className={`p-4 transition-all duration-200 ${task.completed ? 'opacity-75' : ''} hover:shadow-md`}>
      <div className="flex items-start gap-3">
        {/* Completion Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggle(task.id)}
          className={`touch-target p-2 ${task.completed ? 'text-success' : 'text-muted-foreground'}`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <Check className={`h-5 w-5 ${task.completed ? 'opacity-100' : 'opacity-30'}`} />
        </Button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start gap-2 mb-2">
            <span 
              className={`text-base ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}
            >
              {task.text}
            </span>
            
            {/* Priority Badge */}
            <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
              <Flag className="h-3 w-3 mr-1" />
              {task.priority}
            </Badge>

            {/* Category Badge */}
            <Badge variant="outline" className="text-xs">
              {getCategoryIcon(task.category)}
              <span className="ml-1">{task.category}</span>
            </Badge>
          </div>

          {/* Due Date */}
          {task.dueDate && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
              <Calendar className="h-3 w-3" />
              <span>Due: {formatDate(task.dueDate)}</span>
            </div>
          )}

          {/* Created Date */}
          <div className="text-xs text-muted-foreground">
            Created: {formatDate(task.createdAt)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="touch-target p-2 text-muted-foreground hover:text-foreground"
            aria-label="Edit task"
          >
            <Edit className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="touch-target p-2 text-muted-foreground hover:text-destructive"
            aria-label="Delete task"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Screen Reader Information */}
      <div className="sr-only">
        Task: {task.text}. 
        Status: {task.completed ? language.completed : language.pending}.
        Priority: {task.priority}.
        Category: {task.category}.
        {task.dueDate && `Due date: ${formatDate(task.dueDate)}.`}
      </div>
    </Card>
  );
};

export default TaskItem;