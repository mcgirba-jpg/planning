import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Calendar, BarChart3 } from 'lucide-react';

export default function PlanningApp() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const planningData = [
    { id: 1, name: 'Janvier 2026', type: 'month', emoji: '📅', link: 'https://docs.google.com/spreadsheets/d/1ctLpflaqIJoPB20HMOnPaOAGtcuaQtjo/edit?usp=sharing' },
    { id: 2, name: 'Février 2026', type: 'month', emoji: '📅', link: 'https://docs.google.com/spreadsheets/d/1gAxiq7I9nZ_VjyJU4YStgYikfdiVTVtE/edit?usp=sharing' },
    { id: 3, name: 'Mars 2026', type: 'month', emoji: '📅', link: 'https://docs.google.com/spreadsheets/d/1ZW5GZRAYNpHo-xt9vZMEq_tBnxV40Vaa/edit?usp=sharing' },
    { id: 4, name: 'Avril 2026', type: 'month', emoji: '📅', link: 'https://docs.google.com/spreadsheets/d/1BFzyDIQy-WECqmZiqS37u8CzyGmMHwNY/edit?usp=sharing' },
    { id: 5, name: 'Mai 2026', type: 'month', emoji: '📅', link: 'https://docs.google.com/spreadsheets/d/1u8LFOFL4n5OzxbGTBX4hfIl_azZNBjlX/edit?usp=sharing' },
    { id: 6, name: 'Juin 2026', type: 'month', emoji: '📅', link: 'https://docs.google.com/spreadsheets/d/10gi0TWnzOCaqXHV1FRKeBI3GY_DHsnar/edit?usp=sharing' },
    { id: 7, name: 'Juillet 2026', type: 'month', emoji: '📅', link: 'https://docs.google.com/spreadsheets/d/1tnJB3MGRR7xAtqW2nywUQGEpi9A6f9xP/edit?usp=sharing' },
    { id: 8, name: 'Août 2026', type: 'month', emoji: '📅', link: 'https://docs.google.com/spreadsheets/d/11Q24OeKa7EHO6FtCMZK4iLBmXA5tloB7/edit?usp=sharing' },
    { id: 9, name: 'Septembre 2026', type: 'month', emoji: '📅', link: 'https://docs.google.com/spreadsheets/d/10BmW4LOfkPaz8RPqWmnTjfqoaETPc1g-/edit?usp=sharing' },
    { id: 10, name: 'Octobre 2026', type: 'month', emoji: '📅', link: 'https://docs.google.com/spreadsheets/d/1ZcYNHwspUstRdnbxhiONrQYCcUgECnQU/edit?usp=sharing' },
    { id: 11, name: 'Novembre 2026', type: 'month', emoji: '📅', link: 'https://docs.google.com/spreadsheets/d/1V0-2qlcaEpEvGxqAgSvoBiFDitv8rX07/edit?usp=sharing' },
    { id: 12, name: 'Décembre 2026', type: 'month', emoji: '📅', link: 'https://docs.google.com/spreadsheets/d/1J48cLBg-aaJ7_-A6ZS0HblwTASW_sriV/edit?usp=sharing' },
    { id: 13, name: 'Total Annuel', type: 'summary', emoji: '📊', link: 'https://docs.google.com/spreadsheets/d/1M_0-UwDXfCqgZ0oKKf3OrIU4pMO8W1bs/edit?usp=sharing' },
    { id: 14, name: 'MB Planning 2026', type: 'personal', emoji: '📋', link: 'https://docs.google.com/spreadsheets/d/1t4zq140HfGfi_8EPlq0tBWb5O79VOC60/edit?usp=sharing' },
    { id: 15, name: 'JR Planning 2026', type: 'personal', emoji: '📋', link: 'https://docs.google.com/spreadsheets/d/175hwV2hQgHj2V-hcI7jmRtXus3BDYTo4/edit?usp=sharing' },
  ];

  const filteredData = useMemo(() => {
    return planningData.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const months = filteredData.filter(item => item.type === 'month');
  const summaries = filteredData.filter(item => item.type !== 'month');

  const openLink = (url) => {
    window.open(url, '_blank');
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'summary':
        return 'from-orange-500 to-red-500';
      case 'personal':
        return 'from-green-500 to-teal-500';
      default:
        return 'from-blue-500 to-purple-500';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'summary':
        return 'Résumé';
      case 'personal':
        return 'Personnel';
      default:
        return 'Mois';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white sticky top-0 z-40 shadow-xl">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Planning 2026</h1>
                <p className="text-purple-200 text-sm">Mihaela Boulu - Tous les mois</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-purple-300" />
            <input
              type="text"
              placeholder="Rechercher un mois ou un planning..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-purple-500 bg-opacity-30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-4 text-white">
            <div className="text-sm text-purple-200 mb-1">Mois disponibles</div>
            <div className="text-3xl font-bold">{months.length}</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-4 text-white">
            <div className="text-sm text-purple-200 mb-1">Plannings personnels</div>
            <div className="text-3xl font-bold">{summaries.filter(s => s.type === 'personal').length}</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-4 text-white">
            <div className="text-sm text-purple-200 mb-1">Résumés annuels</div>
            <div className="text-3xl font-bold">{summaries.filter(s => s.type === 'summary').length}</div>
          </div>
        </div>

        {/* Months Grid */}
        {months.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Plannings mensuels
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {months.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
                  onClick={() => setSelectedMonth(item)}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(item.type)} opacity-0 group-hover:opacity-10 transition-opacity`}></div>

                  {/* Content */}
                  <div className="relative p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-4xl mb-3">{item.emoji}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                      <p className="text-gray-600 text-sm">Ouvrir le planning</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs font-semibold px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                        {getTypeLabel(item.type)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openLink(item.link);
                        }}
                        className="text-purple-600 hover:text-purple-800 transition"
                        title="Ouvrir"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Summaries and Personal Plannings */}
        {summaries.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Plannings additionnels
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {summaries.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
                  onClick={() => setSelectedMonth(item)}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(item.type)} opacity-0 group-hover:opacity-10 transition-opacity`}></div>

                  {/* Content */}
                  <div className="relative p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-4xl mb-3">{item.emoji}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {item.type === 'summary' ? 'Voir le décompte annuel' : 'Voir le planning personnel'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs font-semibold px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
                        {getTypeLabel(item.type)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openLink(item.link);
                        }}
                        className="text-orange-600 hover:text-orange-800 transition"
                        title="Ouvrir"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-purple-300 mx-auto mb-4 opacity-50" />
            <p className="text-white text-lg">Aucun planning trouvé pour "{searchTerm}"</p>
          </div>
        )}
      </main>

      {/* Modal Detail */}
      {selectedMonth && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMonth(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-5xl mb-4">{selectedMonth.emoji}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedMonth.name}</h2>
            <p className="text-gray-600 mb-6">
              {selectedMonth.type === 'summary'
                ? 'Accédez au décompte complet de l\'année 2026'
                : selectedMonth.type === 'personal'
                ? 'Consultez votre planning personnel'
                : `Consultez le planning du mois de ${selectedMonth.name.split(' ')[0]}`}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedMonth(null)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  openLink(selectedMonth.link);
                  setSelectedMonth(null);
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                Ouvrir <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black bg-opacity-30 text-white text-center py-6 mt-12 border-t border-white border-opacity-10">
        <p className="text-sm">✅ Tous les mois disponibles - Cliquez pour accéder au planning</p>
        <p className="text-xs text-gray-400 mt-2">Planning 2026 © Mihaela Boulu</p>
      </footer>
    </div>
  );
}