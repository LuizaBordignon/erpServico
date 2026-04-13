import { useEffect, useState } from 'react';
import api from '../api/axios';

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    in_progress: 0,
    completed: 0,
  });

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await api.get('/orders');
        const orders = response.data;
        setStats({
          total:       orders.length,
          pending:     orders.filter(o => o.status === 'pending').length,
          in_progress: orders.filter(o => o.status === 'in_progress').length,
          completed:   orders.filter(o => o.status === 'completed').length,
        });
      } catch (err) {
        console.error('Erro ao carregar stats:', err);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Sistema de OS</h1>
        <div className="flex items-center gap-6">
          <span className="text-gray-600 text-sm">Olá, {user.name}</span>
          <a href="/clients" className="text-blue-600 text-sm hover:underline">Clientes</a>
          <a href="/orders" className="text-blue-600 text-sm hover:underline">Ordens</a>
          <button
            onClick={() => { localStorage.clear(); window.location.href = '/'; }}
            className="text-red-500 text-sm hover:underline"
          >
            Sair
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h2>

        <div className="grid grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-400 text-sm">Total de OS</p>
            <p className="text-4xl font-bold text-gray-800 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-400 text-sm">Pendentes</p>
            <p className="text-4xl font-bold text-yellow-500 mt-2">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-400 text-sm">Em andamento</p>
            <p className="text-4xl font-bold text-blue-500 mt-2">{stats.in_progress}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-400 text-sm">Concluídas</p>
            <p className="text-4xl font-bold text-green-500 mt-2">{stats.completed}</p>
          </div>
        </div>

        
         <a href="/orders/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          + Nova Ordem de Serviço
        </a>
      </div>
    </div>
  );
}

export default Dashboard;