import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  X, 
  Sun, 
  Moon, 
  Type, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff,
  Globe,
  Clock,
  Eye
} from 'lucide-react';

interface SettingsPanelProps {
  settings: any;
  onSettingsChange: (settings: any) => void;
  onClose: () => void;
  language: any;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  onClose,
  language
}) => {
  const updateSetting = (key: string, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{language.settings}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="touch-target"
              aria-label="Close settings"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Theme Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Appearance
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Theme Toggle */}
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="theme"
                    checked={settings.theme === 'dark'}
                    onCheckedChange={(checked) => updateSetting('theme', checked ? 'dark' : 'light')}
                  />
                  <Label htmlFor="theme" className="flex items-center gap-2">
                    {settings.theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    {settings.theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </Label>
                </div>
              </div>

              {/* Text Size */}
              <div className="space-y-2">
                <Label htmlFor="textSize">Text Size</Label>
                <Select
                  value={settings.textSize}
                  onValueChange={(value) => updateSetting('textSize', value)}
                >
                  <SelectTrigger className="touch-target">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="xlarge">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Audio Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Audio & Voice
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Audio Feedback */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="audioEnabled"
                    checked={settings.audioEnabled}
                    onCheckedChange={(checked) => updateSetting('audioEnabled', checked)}
                  />
                  <Label htmlFor="audioEnabled" className="flex items-center gap-2">
                    {settings.audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    Audio Feedback
                  </Label>
                </div>
              </div>

              {/* Voice Commands */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="voiceEnabled"
                    checked={settings.voiceEnabled}
                    onCheckedChange={(checked) => updateSetting('voiceEnabled', checked)}
                  />
                  <Label htmlFor="voiceEnabled" className="flex items-center gap-2">
                    {settings.voiceEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    Voice Commands
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Language & Region */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Language & Region
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Language */}
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => updateSetting('language', value)}
                >
                  <SelectTrigger className="touch-target">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="tl">Tagalog</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Time Format */}
              <div className="space-y-2">
                <Label htmlFor="timeFormat">Time Format</Label>
                <Select
                  value={settings.timeFormat}
                  onValueChange={(value) => updateSetting('timeFormat', value)}
                >
                  <SelectTrigger className="touch-target">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                    <SelectItem value="24h">24-hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Accessibility Info */}
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Accessibility Features
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• All interactive elements have keyboard navigation</li>
              <li>• Screen reader support with ARIA labels</li>
              <li>• High contrast colors for better visibility</li>
              <li>• Large touch targets for easy interaction</li>
              <li>• Voice commands and audio feedback</li>
              <li>• Focus mode for distraction-free use</li>
            </ul>
          </div>

          {/* Close Button */}
          <div className="flex justify-end">
            <Button onClick={onClose} className="touch-target">
              Done
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPanel;