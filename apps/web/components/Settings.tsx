
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

export default function Settings() {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Settings & Preferences</h2>
        
        <div className="space-y-4">
          <Card className="bg-gray-800/30 border-0 p-4 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
              
              </div>
              <div className="flex items-center justify-between">
                <span>Push Notifications</span>
              
              </div>
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
              
              </div>
            </div>
          </Card>
  
          <Card className="bg-gray-800/30 border-0 p-4 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Display Name</label>
                <Input placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Bio</label>
                <textarea placeholder="Tell us about yourself" />
              </div>
            </div>
          </Card>
  
          <Card className="bg-gray-800/30 border-0 p-4 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Public Profile</span>
              
              </div>
              <div className="flex items-center justify-between">
                <span>Show Activity Status</span>
              
              </div>
            </div>
          </Card>
  
          <Card className="bg-gray-800/30 border-0 p-4 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Connected Devices</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Fitbit Charge 5</p>
                  <p className="text-sm text-gray-400">Connected</p>
                </div>
                <Button variant="ghost">Disconnect</Button>
              </div>
            </div>
          </Card>
  
          <Button className="w-full">Save Changes</Button>
        </div>
      </div>
    )
  }