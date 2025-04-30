import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';

interface ProfileFormValues {
  name: string;
  email: string;
  income: number;
  savingsGoal: number;
  riskAppetite: 'low' | 'medium' | 'high';
}

const Profile: React.FC = () => {
  const { isAuthenticated, user, updateUserProfile, isLoading, logout } = useAuthStore();
  const navigate = useNavigate();
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<ProfileFormValues>();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        income: user.income,
        savingsGoal: user.savingsGoal,
        riskAppetite: user.riskAppetite,
      });
    }
  }, [user, reset]);
  
  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await updateUserProfile({
        name: data.name,
        income: Number(data.income),
        savingsGoal: Number(data.savingsGoal),
        riskAppetite: data.riskAppetite,
      });
      
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="name"
                type="text"
                label="Full Name"
                error={errors.name?.message}
                {...register('name', { 
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  }
                })}
              />
              
              <Input
                id="email"
                type="email"
                label="Email Address"
                disabled
                {...register('email')}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="income"
                type="number"
                step="100"
                label="Monthly Income ($)"
                error={errors.income?.message}
                {...register('income', { 
                  required: 'Income is required',
                  min: { value: 0, message: 'Income must be a positive number' },
                  valueAsNumber: true
                })}
              />
              
              <Input
                id="savingsGoal"
                type="number"
                step="100"
                label="Monthly Savings Goal ($)"
                error={errors.savingsGoal?.message}
                {...register('savingsGoal', { 
                  required: 'Savings goal is required',
                  min: { value: 0, message: 'Savings goal must be a positive number' },
                  valueAsNumber: true
                })}
              />
            </div>
            
            <Select
              id="riskAppetite"
              label="Investment Risk Appetite"
              options={[
                { value: 'low', label: 'Low - Safety First' },
                { value: 'medium', label: 'Medium - Balanced Approach' },
                { value: 'high', label: 'High - Growth Focused' },
              ]}
              error={errors.riskAppetite?.message}
              {...register('riskAppetite', { required: 'Risk appetite is required' })}
            />
            
            <div className="flex justify-between">
              <Button
                type="submit"
                isLoading={isLoading}
              >
                Update Profile
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </form>
        </Card>
        
        <Card title="Account Security">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              For security reasons, we recommend changing your password regularly.
            </p>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => alert('Password change feature will be available soon!')}
            >
              Change Password
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;