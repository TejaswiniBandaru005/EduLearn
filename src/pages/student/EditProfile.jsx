import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { FormGroup, Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, MapPin, Globe, X, Plus, Save, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export const EditProfile = () => {
  const { currentUser, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://example.com',
    bio: 'Frontend developer passionate about creating beautiful and functional user interfaces. Currently learning advanced React patterns and improving my skills in UI/UX design.',
  });
  
  const [skills, setSkills] = useState(['React', 'JavaScript', 'HTML/CSS', 'UI Design', 'Tailwind CSS']);
  const [newSkill, setNewSkill] = useState('');
  
  const [interests, setInterests] = useState(['Web Development', 'UX Research', 'Mobile Apps', 'AI']);
  const [newInterest, setNewInterest] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Privacy settings states (added)
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [showLearningActivity, setShowLearningActivity] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add a new skill
  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  // Remove a skill
  const removeSkill = (skillToRemove) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  // Add a new interest
  const addInterest = (e) => {
    e.preventDefault();
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests(prev => [...prev, newInterest.trim()]);
      setNewInterest('');
    }
  };

  // Remove an interest
  const removeInterest = (interestToRemove) => {
    setInterests(prev => prev.filter(interest => interest !== interestToRemove));
  };

  // Privacy settings handlers (added)
  const handleProfileVisibilityChange = (e) => {
    setProfileVisibility(e.target.value);
  };
  const handleToggleLearningActivity = () => {
    setShowLearningActivity(prev => !prev);
  };
  const handleToggleEmailNotifications = () => {
    setEmailNotifications(prev => !prev);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    
    try {
      // In a real app, this would update the user profile in the backend
      const result = await updateProfile({
        ...formData,
        skills,
        interests
      });
      
      if (result.success) {
        setSuccessMessage('Profile updated successfully');
        setTimeout(() => {
          navigate('/profile');
        }, 1500);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate('/profile')}
          icon={<ArrowLeft size={16} />}
        >
          Back to Profile
        </Button>
        <h1 className="text-2xl font-bold">Edit Profile</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Picture */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="mb-4">
                    <Avatar 
                      src={currentUser?.avatar}
                      alt={currentUser?.name}
                      size="xl"
                      className="w-32 h-32"
                    />
                  </div>
                  <Button variant="outline" className="mb-6">
                    Change Picture
                  </Button>
                  
                  <div className="w-full space-y-1 text-sm text-gray-500 dark:text-gray-400">
                    <p>Recommended: Square JPG or PNG</p>
                    <p>Maximum size: 1MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Right Column - Profile Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Personal Information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <FormGroup label="Full Name" htmlFor="name">
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      icon={<User size={18} />}
                    />
                  </FormGroup>
                  
                  <FormGroup label="Email" htmlFor="email">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      icon={<Mail size={18} />}
                    />
                  </FormGroup>
                  
                  <FormGroup label="Phone" htmlFor="phone">
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      icon={<Phone size={18} />}
                    />
                  </FormGroup>
                  
                  <FormGroup label="Location" htmlFor="location">
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      icon={<MapPin size={18} />}
                    />
                  </FormGroup>
                </div>
                
                <FormGroup label="Website" htmlFor="website">
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    icon={<Globe size={18} />}
                  />
                </FormGroup>
                
                <FormGroup label="Bio" htmlFor="bio">
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="input pt-2"
                  ></textarea>
                </FormGroup>
              </CardContent>
            </Card>
            
            {/* Skills & Interests */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Skills & Interests</h2>
                
                {/* Skills */}
                <div className="mb-6">
                  <FormGroup label="Skills" htmlFor="skills">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {skills.map(skill => (
                        <Badge key={skill} className="pl-2 pr-1 py-1 flex items-center">
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-1 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                          >
                            <X size={12} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex">
                      <Input
                        id="newSkill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill..."
                        className="rounded-r-none"
                      />
                      <Button
                        type="button"
                        onClick={addSkill}
                        className="rounded-l-none"
                        icon={<Plus size={16} />}
                      >
                        Add
                      </Button>
                    </div>
                  </FormGroup>
                </div>
                
                {/* Interests */}
                <FormGroup label="Interests" htmlFor="interests">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {interests.map(interest => (
                      <Badge key={interest} variant="secondary" className="pl-2 pr-1 py-1 flex items-center">
                        {interest}
                        <button
                          type="button"
                          onClick={() => removeInterest(interest)}
                          className="ml-1 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex">
                    <Input
                      id="newInterest"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      placeholder="Add an interest..."
                      className="rounded-r-none"
                    />
                    <Button
                      type="button"
                      onClick={addInterest}
                      className="rounded-l-none"
                      icon={<Plus size={16} />}
                    >
                      Add
                    </Button>
                  </div>
                </FormGroup>
              </CardContent>
            </Card>
            
            {/* Privacy Settings */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Profile Visibility</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Control who can see your profile information
                      </p>
                    </div>
                    <select
                      className="input w-auto"
                      value={profileVisibility}
                      onChange={handleProfileVisibilityChange}
                    >
                      <option value="public">Public</option>
                      <option value="registered">Registered Users</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Learning Activity</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Show your learning progress to others
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        checked={showLearningActivity}
                        onChange={handleToggleLearningActivity}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive updates about course activity
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        checked={emailNotifications}
                        onChange={handleToggleEmailNotifications}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Submit Buttons */}
            <div className="flex justify-between items-center">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/profile')}
              >
                Cancel
              </Button>
              
              <div className="flex items-center space-x-4">
                {successMessage && (
                  <span className="text-success-600 dark:text-success-400 text-sm">
                    {successMessage}
                  </span>
                )}
                <Button 
                  type="submit" 
                  isLoading={isLoading}
                  icon={<Save size={16} />}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </form>
    </div>
  );
};
