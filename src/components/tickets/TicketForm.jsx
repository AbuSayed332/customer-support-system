import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paperclip, X } from 'lucide-react';
import ticketService from '../../services/ticketService';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import Select from '../common/Select';
import Button from '../common/Button';
import Alert from '../common/Alert';
import { TICKET_PRIORITY, TICKET_CATEGORY } from '../../utils/constants';
import { toast } from 'react-toastify';

const TicketForm = ({ ticket = null, onSuccess }) => {
  const navigate = useNavigate();
  const isEdit = !!ticket;
  
  const [formData, setFormData] = useState({
    subject: ticket?.subject || '',
    description: ticket?.description || '',
    category: ticket?.category || '',
    priority: ticket?.priority || 'Medium',
  });
  
  const [attachments, setAttachments] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const removeFile = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.subject || formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }
    
    if (!formData.description || formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.priority) {
      newErrors.priority = 'Please select a priority';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const ticketData = {
        ...formData,
        attachments,
      };
      
      if (isEdit) {
        await ticketService.update(ticket._id, formData);
        toast.success('Ticket updated successfully');
      } else {
        await ticketService.create(ticketData);
        toast.success('Ticket created successfully');
      }
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/tickets');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        error={errors.subject}
        placeholder="Brief description of your issue"
        required
      />

      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        placeholder="Provide detailed information about your issue"
        rows={6}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          error={errors.category}
          placeholder="Select category"
          options={Object.values(TICKET_CATEGORY).map(cat => ({
            value: cat,
            label: cat,
          }))}
          required
        />

        <Select
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          error={errors.priority}
          placeholder="Select priority"
          options={Object.values(TICKET_PRIORITY).map(priority => ({
            value: priority,
            label: priority,
          }))}
          required
        />
      </div>

      {/* File Attachments */}
      {!isEdit && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Attachments (Optional)
          </label>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <Paperclip className="w-5 h-5 mr-2 text-gray-600" />
              <span className="text-sm text-gray-700">Choose Files</span>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.txt"
              />
            </label>
            <span className="text-sm text-gray-500">
              Max 5 files, 5MB each
            </span>
          </div>

          {/* Selected Files */}
          {attachments.length > 0 && (
            <div className="mt-4 space-y-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate('/tickets')}
        >
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {isEdit ? 'Update Ticket' : 'Create Ticket'}
        </Button>
      </div>
    </form>
  );
};

export default TicketForm;
