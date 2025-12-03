import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { decisionService } from '../api/services';
import { type CreateDecisionCommand, Visibility, type ProblemDetails } from '../types';
import { t } from '../textResources';

const CreateDecision = () => {
  const navigate = useNavigate();
  
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expectedOutcome, setExpectedOutcome] = useState('');
  const [reflectionDate, setReflectionDate] = useState(defaultDate.toISOString().slice(0, 16));
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Private);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const selectedDate = new Date(reflectionDate);
    const oneHourInFuture = new Date(new Date().getTime() + 60 * 60 * 1000);
    if (selectedDate < oneHourInFuture) {
      setError(t.createDecision.errors.dateTooSoon);
      return;
    }

    setIsSubmitting(true);

    try {
      const command: CreateDecisionCommand = {
        title,
        description,
        expectedOutcome,
        visibility,
        expectedReflectionDate: new Date(reflectionDate).toISOString() 
      };

      await decisionService.create(command);
      navigate('/');
      
    } catch (err) {
      console.error(err);
      
      if (axios.isAxiosError(err) && err.response?.data) {
         const problem = err.response.data as ProblemDetails;
         setError(problem.detail || t.createDecision.errors.createFailed);
      } else {
        setError(t.common.networkError);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{t.createDecision.title}</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-6 text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              {t.createDecision.form.titleLabel} <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              required
              maxLength={60}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t.createDecision.form.titlePlaceholder}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                {t.createDecision.form.dateLabel} <span className="text-red-500">*</span>
              </label>
              <input
                id="date"
                type="datetime-local"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reflectionDate}
                onChange={(e) => setReflectionDate(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">{t.createDecision.form.dateHelp}</p>
            </div>

            <div>
              <label htmlFor="visibility" className="block text-sm font-medium text-gray-700 mb-1">
                {t.createDecision.form.visibilityLabel}
              </label>
              <select
                id="visibility"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={visibility}
                onChange={(e) => setVisibility(Number(e.target.value) as Visibility)}
              >
                <option value={Visibility.Private}>{t.createDecision.form.visibilityOptions.private}</option>
                <option value={Visibility.Public}>{t.createDecision.form.visibilityOptions.public}</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              {t.createDecision.form.descriptionLabel} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              required
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t.createDecision.form.descriptionPlaceholder}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="outcome" className="block text-sm font-medium text-gray-700 mb-1">
              {t.createDecision.form.outcomeLabel} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="outcome"
              required
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t.createDecision.form.outcomePlaceholder}
              value={expectedOutcome}
              onChange={(e) => setExpectedOutcome(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              {t.common.cancel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 text-white font-bold rounded-md transition
                ${isSubmitting 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
            >
              {isSubmitting ? t.createDecision.form.submittingButton : t.createDecision.form.submitButton}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateDecision;
