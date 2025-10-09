// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Paperclip, X } from 'lucide-react';
// import ticketService from '../../services/ticketService';
// import Input from '../common/Input';
// import TextArea from '../common/TextArea';
// import Select from '../common/Select';
// import Button from '../common/Button';
// import Alert from '../common/Alert';
// import { TICKET_PRIORITY, TICKET_CATEGORY } from '../../utils/constants';
// import { toast } from 'react-toastify';

// const TicketForm = ({ ticket = null, onSuccess }) => {
//   const navigate = useNavigate();
//   const isEdit = !!ticket;
  
//   const [formData, setFormData] = useState({
//     subject: ticket?.subject || '',
//     description: ticket?.description || '',
//     category: ticket?.category || '',
//     priority: ticket?.priority || 'Medium',
//   });
  
//   const [attachments, setAttachments] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: '' });
//     }
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setAttachments([...attachments, ...files]);
//   };

//   const removeFile = (index) => {
//     setAttachments(attachments.filter((_, i) => i !== index));
//   };

//   const validate = () => {
//     const newErrors = {};
    
//     if (!formData.subject || formData.subject.trim().length < 5) {
//       newErrors.subject = 'Subject must be at least 5 characters';
//     }
    
//     if (!formData.description || formData.description.trim().length < 10) {
//       newErrors.description = 'Description must be at least 10 characters';
//     }
    
//     if (!formData.category) {
//       newErrors.category = 'Please select a category';
//     }
    
//     if (!formData.priority) {
//       newErrors.priority = 'Please select a priority';
//     }
    
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const newErrors = validate();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setLoading(true);

//     try {
//       const ticketData = {
//         ...formData,
//         attachments,
//       };
      
//       if (isEdit) {
//         await ticketService.update(ticket._id, formData);
//         toast.success('Ticket updated successfully');
//       } else {
//         await ticketService.create(ticketData);
//         toast.success('Ticket created successfully');
//       }
      
//       if (onSuccess) {
//         onSuccess();
//       } else {
//         navigate('/tickets');
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to save ticket');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <Input
//         label="Subject"
//         name="subject"
//         value={formData.subject}
//         onChange={handleChange}
//         error={errors.subject}
//         placeholder="Brief description of your issue"
//         required
//       />

//       <TextArea
//         label="Description"
//         name="description"
//         value={formData.description}
//         onChange={handleChange}
//         error={errors.description}
//         placeholder="Provide detailed information about your issue"
//         rows={6}
//         required
//       />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Select
//           label="Category"
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           error={errors.category}
//           placeholder="Select category"
//           options={Object.values(TICKET_CATEGORY).map(cat => ({
//             value: cat,
//             label: cat,
//           }))}
//           required
//         />

//         <Select
//           label="Priority"
//           name="priority"
//           value={formData.priority}
//           onChange={handleChange}
//           error={errors.priority}
//           placeholder="Select priority"
//           options={Object.values(TICKET_PRIORITY).map(priority => ({
//             value: priority,
//             label: priority,
//           }))}
//           required
//         />
//       </div>

//       {/* File Attachments */}
//       {!isEdit && (
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Attachments (Optional)
//           </label>
          
//           <div className="flex items-center space-x-4">
//             <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
//               <Paperclip className="w-5 h-5 mr-2 text-gray-600" />
//               <span className="text-sm text-gray-700">Choose Files</span>
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleFileChange}
//                 className="hidden"
//                 accept="image/*,.pdf,.doc,.docx,.txt"
//               />
//             </label>
//             <span className="text-sm text-gray-500">
//               Max 5 files, 5MB each
//             </span>
//           </div>

//           {/* Selected Files */}
//           {attachments.length > 0 && (
//             <div className="mt-4 space-y-2">
//               {attachments.map((file, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
//                 >
//                   <span className="text-sm text-gray-700">{file.name}</span>
//                   <button
//                     type="button"
//                     onClick={() => removeFile(index)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Actions */}
//       <div className="flex justify-end space-x-4">
//         <Button
//           type="button"
//           variant="secondary"
//           onClick={() => navigate('/tickets')}
//         >
//           Cancel
//         </Button>
//         <Button type="submit" loading={loading}>
//           {isEdit ? 'Update Ticket' : 'Create Ticket'}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default TicketForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paperclip, X, Upload, FileText, Image as ImageIcon } from 'lucide-react';
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
  const [dragActive, setDragActive] = useState(false);

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

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setAttachments([...attachments, ...files]);
    }
  };

  const removeFile = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="w-5 h-5 text-blue-600" />;
    }
    return <FileText className="w-5 h-5 text-gray-600" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Subject Field */}
      <div className="space-y-2">
        <Input
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          error={errors.subject}
          placeholder="Brief description of your issue"
          required
        />
        <p className="text-xs text-gray-500 ml-1">
          {formData.subject.length}/100 characters
        </p>
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <TextArea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          placeholder="Provide detailed information about your issue..."
          rows={6}
          required
        />
        <p className="text-xs text-gray-500 ml-1">
          {formData.description.length} characters
        </p>
      </div>

      {/* Category and Priority Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
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
          <p className="text-xs text-gray-500 ml-1">
            Choose the most relevant category
          </p>
        </div>

        <div className="space-y-2">
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
          <p className="text-xs text-gray-500 ml-1">
            Select urgency level
          </p>
        </div>
      </div>

      {/* File Attachments */}
      {!isEdit && (
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-900">
            Attachments <span className="text-gray-500 font-normal">(Optional)</span>
          </label>
          
          {/* Drag and Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
            
            <div className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Drop files here or click to browse
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Support: Images, PDF, DOC, TXT (Max 5MB each)
                </p>
              </div>
            </div>
          </div>

          {/* Selected Files */}
          {attachments.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-900">
                Selected Files ({attachments.length})
              </p>
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-transparent border border-blue-100 rounded-xl hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                        {getFileIcon(file)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="ml-4 p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate('/tickets')}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          loading={loading}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {isEdit ? 'Update Ticket' : 'Create Ticket'}
        </Button>
      </div>
    </form>
  );
};

export default TicketForm;