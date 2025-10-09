// import React from 'react';
// import { ArrowLeft } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import TicketForm from '../../components/tickets/TicketForm';
// import Card from '../../components/common/Card';
// import Button from '../../components/common/Button';

// const CreateTicketPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="max-w-3xl mx-auto">
//       <div className="mb-6">
//         <Button
//           variant="ghost"
//           onClick={() => navigate('/tickets')}
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" />
//           Back to Tickets
//         </Button>
//       </div>

//       <Card>
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">
//           Create New Ticket
//         </h1>
//         <TicketForm />
//       </Card>
//     </div>
//   );
// };

// export default CreateTicketPage;


import React from 'react';
import { ArrowLeft, Ticket, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TicketForm from '../../components/tickets/TicketForm';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const CreateTicketPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-15">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/tickets')}
          className="group flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
        >
          <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-300 transition-all duration-300">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-medium">Back to Tickets</span>
        </button>

        {/* Header Card */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Ticket className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Create New Ticket
              </h1>
              <p className="text-blue-100 text-lg">
                Fill in the details below to submit your support request
              </p>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Quick Response</p>
                <p className="text-xs text-gray-600">Average reply in 2 hours</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-purple-100 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Ticket className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Track Progress</p>
                <p className="text-xs text-gray-600">Real-time updates</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-green-100 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Expert Support</p>
                <p className="text-xs text-gray-600">Dedicated team</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3"></span>
              Ticket Details
            </h2>
            <p className="text-gray-600 mt-2 ml-5">
              Please provide as much detail as possible to help us assist you better
            </p>
          </div>
          
          <TicketForm />
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Tips for Better Support</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Be specific about the issue you're experiencing</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Include any error messages or screenshots if applicable</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Choose the correct category and priority for faster resolution</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateTicketPage;