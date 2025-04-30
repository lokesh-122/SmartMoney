import React from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { TransactionCategory } from '../../types';

export interface TransactionFormValues {
  amount: number;
  type: 'income' | 'expense';
  category: TransactionCategory;
  date: string;
  description: string;
}

interface TransactionFormProps {
  onSubmit: (data: TransactionFormValues) => void;
  isLoading: boolean;
  defaultValues?: Partial<TransactionFormValues>;
  buttonText?: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  isLoading,
  defaultValues,
  buttonText = 'Add Transaction'
}) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<TransactionFormValues>({
    defaultValues: {
      amount: defaultValues?.amount || 0,
      type: defaultValues?.type || 'expense',
      category: defaultValues?.category || 'other',
      date: defaultValues?.date || today,
      description: defaultValues?.description || '',
    }
  });
  
  const transactionType = watch('type');
  
  const incomeCategories = [
    { value: 'salary', label: 'Salary' },
    { value: 'investment', label: 'Investment Returns' },
    { value: 'bonus', label: 'Bonus' },
    { value: 'other', label: 'Other Income' },
  ];
  
  const expenseCategories = [
    { value: 'housing', label: 'Housing' },
    { value: 'food', label: 'Food & Groceries' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'debt', label: 'Debt Payments' },
    { value: 'personal', label: 'Personal Care' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'education', label: 'Education' },
    { value: 'savings', label: 'Savings' },
    { value: 'gifts', label: 'Gifts & Donations' },
    { value: 'other', label: 'Other Expenses' },
  ];
  
  const handleFormSubmit = (data: TransactionFormValues) => {
    onSubmit({
      ...data,
      amount: Number(data.amount)
    });
    
    if (!defaultValues) {
      // Only reset the form if we're adding a new transaction
      reset({
        amount: 0,
        type: 'expense',
        category: 'other',
        date: today,
        description: '',
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="amount"
          type="number"
          step="0.01"
          label="Amount"
          placeholder="0.00"
          error={errors.amount?.message}
          {...register('amount', { 
            required: 'Amount is required',
            min: { value: 0.01, message: 'Amount must be greater than 0' },
            valueAsNumber: true
          })}
        />
        
        <Select
          id="type"
          label="Type"
          options={[
            { value: 'income', label: 'Income' },
            { value: 'expense', label: 'Expense' },
          ]}
          error={errors.type?.message}
          {...register('type', { required: 'Type is required' })}
        />
      </div>
      
      <Select
        id="category"
        label="Category"
        options={transactionType === 'income' ? incomeCategories : expenseCategories}
        error={errors.category?.message}
        {...register('category', { required: 'Category is required' })}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="date"
          type="date"
          label="Date"
          max={today}
          error={errors.date?.message}
          {...register('date', { required: 'Date is required' })}
        />
        
        <Input
          id="description"
          type="text"
          label="Description"
          placeholder="Enter a description"
          error={errors.description?.message}
          {...register('description', { 
            required: 'Description is required',
            maxLength: { 
              value: 100, 
              message: 'Description must be less than 100 characters' 
            }
          })}
        />
      </div>
      
      <Button
        type="submit"
        isLoading={isLoading}
        className="mt-2"
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default TransactionForm;