import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Plus, 
  Settings,
  Focus,
  Globe,
  Type
} from 'lucide-react';
import TaskItem from './TaskItem';
import VoiceNavigation, { VoiceNavigationRef } from './VoiceNavigation';
import AudioFeedback, { AudioFeedbackRef } from './AudioFeedback';
import SettingsPanel from './SettingsPanel';
import FocusMode from './FocusMode';
import NotificationSystem from './NotificationSystem';
import KeyboardNavigation from './KeyboardNavigation';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'personal' | 'work' | 'school';
  dueDate?: Date;
  createdAt: Date;
}

interface DoaListSettings {
  theme: 'light' | 'dark';
  textSize: 'small' | 'normal' | 'large' | 'xlarge';
  language: 'en' | 'tl' | 'es' | 'ja';
  timeFormat: '12h' | '24h';
  audioEnabled: boolean;
  voiceEnabled: boolean;
  focusMode: boolean;
}

const initialSettings: DoaListSettings = {
  theme: 'light',
  textSize: 'normal',
  language: 'en',
  timeFormat: '12h',
  audioEnabled: true,
  voiceEnabled: true,
  focusMode: false,
};

const translations = {
  en: {
    title: 'DoaList - Accessible Tasks',
    addTask: 'Add new task',
    taskPlaceholder: 'What do you need to do?',
    addButton: 'Add Task',
    settings: 'Settings',
    focusMode: 'Focus Mode',
    voiceCommands: 'Voice Commands',
    audioFeedback: 'Audio Feedback',
    noTasks: 'No tasks yet. Add one to get started!',
    completed: 'completed',
    pending: 'pending'
  },
  tl: {
    title: 'DoaList - Mga Gawaing Accessible',
    addTask: 'Magdagdag ng bagong gawain',
    taskPlaceholder: 'Ano ang kailangan mong gawin?',
    addButton: 'Magdagdag ng Gawain',
    settings: 'Mga Setting',
    focusMode: 'Focus Mode',
    voiceCommands: 'Voice Commands',
    audioFeedback: 'Audio Feedback',
    noTasks: 'Walang gawain pa. Magdagdag para magsimula!',
    completed: 'tapos na',
    pending: 'hindi pa tapos'
  },
  es: {
    title: 'DoaList - Tareas Accesibles',
    addTask: 'Agregar nueva tarea',
    taskPlaceholder: '¿Qué necesitas hacer?',
    addButton: 'Agregar Tarea',
    settings: 'Configuración',
    focusMode: 'Modo Enfoque',
    voiceCommands: 'Comandos de Voz',
    audioFeedback: 'Retroalimentación de Audio',
    noTasks: '¡Aún no hay tareas. Agrega una para comenzar!',
    completed: 'completado',
    pending: 'pendiente'
  },
  ja: {
    title: 'DoaList - アクセシブルなタスク',
    addTask: '新しいタスクを追加',
    taskPlaceholder: '何をする必要がありますか？',
    addButton: 'タスクを追加',
    settings: '設定',
    focusMode: 'フォーカスモード',
    voiceCommands: '音声コマンド',
    audioFeedback: 'オーディオフィードバック',
    noTasks: 'まだタスクがありません。開始するには追加してください！',
    completed: '完了',
    pending: '保留中'
  }
};

const DoaList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('medium');
  const [newTaskCategory, setNewTaskCategory] = useState<Task['category']>('personal');
  const [settings, setSettings] = useState<DoaListSettings>(initialSettings);
  const [showSettings, setShowSettings] = useState(false);
  const [currentFocusTask, setCurrentFocusTask] = useState(0);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const audioFeedbackRef = useRef<AudioFeedbackRef>(null);
  const voiceNavigationRef = useRef<VoiceNavigationRef>(null);

  const t = translations[settings.language];

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('doalist-tasks');
    const savedSettings = localStorage.getItem('doalist-settings');
    
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks.map((task: any) => ({
          ...task,
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
          createdAt: new Date(task.createdAt)
        })));
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    }
    
    if (savedSettings) {
      try {
        setSettings({ ...initialSettings, ...JSON.parse(savedSettings) });
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    }
  }, []);

  // Save to localStorage whenever tasks or settings change
  useEffect(() => {
    localStorage.setItem('doalist-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('doalist-settings', JSON.stringify(settings));
  }, [settings]);

  // Apply theme and settings to document
  useEffect(() => {
    document.documentElement.className = '';
    document.documentElement.classList.add(settings.theme);
    document.documentElement.classList.add(`text-size-${settings.textSize}`);
  }, [settings.theme, settings.textSize]);

  const showNotification = useCallback((type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    
    if (audioFeedbackRef.current && settings.audioEnabled) {
      audioFeedbackRef.current.playFeedback(type);
    }
    
    // Auto-hide notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  }, [settings.audioEnabled]);

  const addTask = useCallback((taskText: string, priority: Task['priority'] = 'medium', category: Task['category'] = 'personal') => {
    if (!taskText.trim()) return;

    const newTaskObj: Task = {
      id: Date.now().toString(),
      text: taskText.trim(),
      completed: false,
      priority,
      category,
      createdAt: new Date()
    };

    setTasks(prev => [newTaskObj, ...prev]);
    setNewTask('');
    
    showNotification('success', `Task "${taskText}" added successfully`);
    
    // Announce to screen reader
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Task ${taskText} added to your list`;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [showNotification]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(newTask, newTaskPriority, newTaskCategory);
    setNewTaskPriority('medium');
    setNewTaskCategory('personal');
  };

  const toggleTask = useCallback((taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, completed: !task.completed };
        showNotification('success', updatedTask.completed ? 'Task completed!' : 'Task marked as pending');
        return updatedTask;
      }
      return task;
    }));
  }, [showNotification]);

  const deleteTask = useCallback((taskId: string) => {
    const taskToDelete = tasks.find(task => task.id === taskId);
    setTasks(prev => prev.filter(task => task.id !== taskId));
    
    if (taskToDelete) {
      showNotification('info', `Task "${taskToDelete.text}" deleted`);
    }
  }, [tasks, showNotification]);

  const editTask = useCallback((taskId: string, newText: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, text: newText } : task
    ));
    showNotification('success', 'Task updated successfully');
  }, [showNotification]);

  const handleVoiceCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.startsWith('add task') || lowerCommand.startsWith('create task')) {
      const taskText = command.substring(command.indexOf(':') + 1).trim();
      if (taskText) {
        addTask(taskText);
      }
    } else if (lowerCommand.includes('focus mode')) {
      setSettings(prev => ({ ...prev, focusMode: !prev.focusMode }));
      showNotification('info', settings.focusMode ? 'Focus mode disabled' : 'Focus mode enabled');
    } else if (lowerCommand.includes('read tasks')) {
      if (voiceNavigationRef.current) {
        const taskList = tasks.map(task => 
          `${task.text}, ${task.completed ? t.completed : t.pending}`
        ).join('. ');
        voiceNavigationRef.current.speak(taskList || t.noTasks);
      }
    }
  }, [addTask, settings.focusMode, tasks, showNotification, t]);

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  if (settings.focusMode && pendingTasks.length > 0) {
    return (
      <FocusMode
        tasks={pendingTasks}
        currentTaskIndex={currentFocusTask}
        onTaskComplete={toggleTask}
        onTaskDelete={deleteTask}
        onNextTask={() => setCurrentFocusTask(prev => (prev + 1) % pendingTasks.length)}
        onPreviousTask={() => setCurrentFocusTask(prev => prev === 0 ? pendingTasks.length - 1 : prev - 1)}
        onExitFocus={() => setSettings(prev => ({ ...prev, focusMode: false }))}
        settings={settings}
        language={t}
      />
    );
  }

  return (
    <KeyboardNavigation
      onAddTask={() => inputRef.current?.focus()}
      onToggleFocus={() => setSettings(prev => ({ ...prev, focusMode: !prev.focusMode }))}
      onToggleSettings={() => setShowSettings(!showSettings)}
      onToggleTheme={() => setSettings(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }))}
    >
      <div className="min-h-screen bg-background text-foreground p-4">
        <div className="max-w-4xl mx-auto" id="main-content">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h1 className="text-3xl font-bold text-foreground">
                {t.title}
              </h1>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSettings(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }))}
                  className="touch-target"
                  aria-label={`Switch to ${settings.theme === 'light' ? 'dark' : 'light'} mode (Ctrl+D)`}
                >
                  {settings.theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSettings(prev => ({ ...prev, focusMode: true }))}
                  className="touch-target"
                  aria-label={`${t.focusMode} (Ctrl+F)`}
                  disabled={pendingTasks.length === 0}
                >
                  <Focus className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                  className="touch-target"
                  aria-label={`${t.settings} (Ctrl+,)`}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Task Input */}
            <Card className="p-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-3">
                  <Input
                    ref={inputRef}
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder={t.taskPlaceholder}
                    className="w-full touch-target"
                    aria-label={`${t.addTask} (Ctrl+N to focus)`}
                  />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <select
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value as Task['priority'])}
                      className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm touch-target"
                      aria-label="Task priority"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                    <select
                      value={newTaskCategory}
                      onChange={(e) => setNewTaskCategory(e.target.value as Task['category'])}
                      className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm touch-target"
                      aria-label="Task category"
                    >
                      <option value="personal">Personal</option>
                      <option value="work">Work</option>
                      <option value="school">School</option>
                    </select>
                    <Button
                      type="submit"
                      className="touch-target sm:w-auto w-full"
                      disabled={!newTask.trim()}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {t.addButton}
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          </header>

        {/* Settings Panel */}
        {showSettings && (
          <SettingsPanel
            settings={settings}
            onSettingsChange={setSettings}
            onClose={() => setShowSettings(false)}
            language={t}
          />
        )}

        {/* Task Lists */}
        <div className="space-y-6">
          {/* Pending Tasks */}
          {pendingTasks.length > 0 && (
            <section aria-labelledby="pending-tasks">
              <h2 id="pending-tasks" className="text-xl font-semibold mb-4">
                Pending Tasks ({pendingTasks.length})
              </h2>
              <div className="space-y-3">
                {pendingTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={editTask}
                    settings={settings}
                    language={t}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <section aria-labelledby="completed-tasks">
              <h2 id="completed-tasks" className="text-xl font-semibold mb-4">
                Completed Tasks ({completedTasks.length})
              </h2>
              <div className="space-y-3">
                {completedTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={editTask}
                    settings={settings}
                    language={t}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {tasks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">{t.noTasks}</p>
            </div>
          )}
        </div>
      </div>

      {/* Voice Navigation */}
      <VoiceNavigation
        ref={voiceNavigationRef}
        enabled={settings.voiceEnabled}
        onCommand={handleVoiceCommand}
        language={settings.language}
      />

      {/* Audio Feedback */}
      <AudioFeedback
        ref={audioFeedbackRef}
        enabled={settings.audioEnabled}
      />

      {/* Notification System */}
        <NotificationSystem
          notification={notification}
          onClose={() => setNotification(null)}
        />
      </div>
    </KeyboardNavigation>
  );
};

export default DoaList;