import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TicketForm from '../../components/tickets/TicketForm';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const CreateTicketPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/tickets')}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Tickets
        </Button>
      </div>

      <Card>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Create New Ticket
        </h1>
        <TicketForm />
      </Card>
    </div>
  );
};

export default CreateTicketPage;
