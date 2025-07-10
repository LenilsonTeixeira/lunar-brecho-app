import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Download, RefreshCw } from 'lucide-react';
import {
  Coupon,
  CouponStatus,
  CouponType,
  CouponFilters,
  CouponSort,
  CreateCouponData,
} from '../../types/coupon';
import { useCoupons } from '../../hooks/useCoupons';
import CouponForm from '../../components/admin/CouponForm';
import CouponTableRow from '../../components/admin/CouponTableRow';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

const Coupons = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | undefined>();
  const [deletingCoupon, setDeletingCoupon] = useState<Coupon | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<CouponFilters>({});
  const [sort, setSort] = useState<CouponSort>({ field: 'createdAt', direction: 'desc' });
  const [showFilters, setShowFilters] = useState(false);

  // Usar o hook personalizado
  const {
    coupons,
    loading,
    error,
    stats,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    toggleCouponStatus,
    refreshCoupons,
  } = useCoupons(filters);

  const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([]);

  // Aplicar filtros e ordenação
  useEffect(() => {
    let result = [...coupons];

    // Aplicar busca
    if (searchTerm) {
      result = result.filter((coupon) =>
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Aplicar ordenação
    result.sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sort.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return sort.direction === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sort.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    setFilteredCoupons(result);
  }, [coupons, searchTerm, sort]);

  const handleCreateCoupon = async (data: CreateCouponData) => {
    try {
      await createCoupon(data);
      setShowForm(false);
    } catch (error) {
      console.error('Erro ao criar cupom:', error);
    }
  };

  const handleUpdateCoupon = async (data: CreateCouponData) => {
    if (!editingCoupon) return;

    try {
      await updateCoupon(editingCoupon.id, { ...data, id: editingCoupon.id });
      setShowForm(false);
      setEditingCoupon(undefined);
    } catch (error) {
      console.error('Erro ao atualizar cupom:', error);
    }
  };

  const handleDeleteCoupon = async (coupon: Coupon) => {
    setDeletingCoupon(coupon);
  };

  const confirmDelete = async () => {
    if (!deletingCoupon) return;

    try {
      await deleteCoupon(deletingCoupon.id);
      setDeletingCoupon(undefined);
    } catch (error) {
      console.error('Erro ao excluir cupom:', error);
    }
  };

  const handleToggleStatus = async (coupon: Coupon) => {
    try {
      await toggleCouponStatus(coupon.id, !coupon.isActive);
    } catch (error) {
      console.error('Erro ao alterar status do cupom:', error);
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setShowForm(true);
  };

  const handleSort = (field: keyof Coupon) => {
    setSort((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const handleExport = async () => {
    try {
      await fetch('/api/coupons/export?format=csv').then((res) => res.blob());
      alert('Cupons exportados com sucesso');
    } catch (error) {
      console.error('Erro ao exportar cupons:', error);
    }
  };

  return (
    <div className='py-6 flex flex-col justify-between bg-slate-50'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-slate-800 mb-2'>
                Cupons de Desconto
              </h1>
              <p className='text-sm sm:text-base text-slate-600'>
                Gerencie os cupons de desconto da sua loja
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className='inline-flex items-center gap-2 py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg'
            >
              <Plus className='w-4 h-4' />
              Novo Cupom
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
            <p className='text-red-800 text-sm'>{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
          <div className='bg-white rounded-xl shadow-sm p-4 border border-slate-200'>
            <div className='text-2xl font-bold text-slate-800'>{stats.total}</div>
            <div className='text-sm text-slate-600'>Total</div>
          </div>
          <div className='bg-white rounded-xl shadow-sm p-4 border border-slate-200'>
            <div className='text-2xl font-bold text-green-600'>{stats.active}</div>
            <div className='text-sm text-slate-600'>Ativos</div>
          </div>
          <div className='bg-white rounded-xl shadow-sm p-4 border border-slate-200'>
            <div className='text-2xl font-bold text-gray-600'>{stats.inactive}</div>
            <div className='text-sm text-slate-600'>Inativos</div>
          </div>
          <div className='bg-white rounded-xl shadow-sm p-4 border border-slate-200'>
            <div className='text-2xl font-bold text-red-600'>{stats.expired}</div>
            <div className='text-sm text-slate-600'>Expirados</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className='bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6'>
          <div className='flex flex-col lg:flex-row gap-4'>
            {/* Search */}
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
                <input
                  type='text'
                  placeholder='Buscar por código...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className='inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors duration-200'
            >
              <Filter className='w-4 h-4' />
              Filtros
            </button>

            {/* Clear Filters */}
            {(Object.keys(filters).length > 0 || searchTerm) && (
              <button
                onClick={clearFilters}
                className='px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors duration-200'
              >
                Limpar
              </button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className='mt-4 pt-4 border-t border-slate-200'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                  <label className='text-sm font-medium text-slate-700 mb-2 block'>Status</label>
                  <select
                    value={filters.status || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: (e.target.value as CouponStatus) || undefined,
                      }))
                    }
                    className='w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
                  >
                    <option value=''>Todos</option>
                    <option value='ACTIVE'>Ativos</option>
                    <option value='INACTIVE'>Inativos</option>
                    <option value='EXPIRED'>Expirados</option>
                  </select>
                </div>

                <div>
                  <label className='text-sm font-medium text-slate-700 mb-2 block'>Tipo</label>
                  <select
                    value={filters.type || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        type: (e.target.value as CouponType) || undefined,
                      }))
                    }
                    className='w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
                  >
                    <option value=''>Todos</option>
                    <option value='PERCENTAGE'>Percentual</option>
                    <option value='FIXED'>Valor Fixo</option>
                  </select>
                </div>

                <div>
                  <label className='text-sm font-medium text-slate-700 mb-2 block'>Estado</label>
                  <select
                    value={filters.isActive === undefined ? '' : filters.isActive.toString()}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        isActive: e.target.value === '' ? undefined : e.target.value === 'true',
                      }))
                    }
                    className='w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300'
                  >
                    <option value=''>Todos</option>
                    <option value='true'>Ativos</option>
                    <option value='false'>Inativos</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-slate-50 border-b border-slate-200'>
                <tr>
                  <th
                    className='py-4 px-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors duration-200'
                    onClick={() => handleSort('code')}
                  >
                    <div className='flex items-center gap-1'>
                      Código
                      {sort.field === 'code' && (
                        <span className='text-purple-600'>
                          {sort.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className='py-4 px-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors duration-200'
                    onClick={() => handleSort('type')}
                  >
                    <div className='flex items-center gap-1'>
                      Tipo
                      {sort.field === 'type' && (
                        <span className='text-purple-600'>
                          {sort.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className='py-4 px-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors duration-200'
                    onClick={() => handleSort('value')}
                  >
                    <div className='flex items-center gap-1'>
                      Valor
                      {sort.field === 'value' && (
                        <span className='text-purple-600'>
                          {sort.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className='py-4 px-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors duration-200'
                    onClick={() => handleSort('expirationDate')}
                  >
                    <div className='flex items-center gap-1'>
                      Expira em
                      {sort.field === 'expirationDate' && (
                        <span className='text-purple-600'>
                          {sort.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className='py-4 px-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors duration-200'
                    onClick={() => handleSort('currentUsage')}
                  >
                    <div className='flex items-center gap-1'>
                      Usos
                      {sort.field === 'currentUsage' && (
                        <span className='text-purple-600'>
                          {sort.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className='py-4 px-4 text-left text-sm font-semibold text-slate-700'>
                    Status
                  </th>
                  <th className='py-4 px-4 text-left text-sm font-semibold text-slate-700'>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className='py-12 text-center text-slate-500'>
                      <div className='flex flex-col items-center gap-2'>
                        <div className='w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin'></div>
                        <p className='font-medium'>Carregando cupons...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredCoupons.length > 0 ? (
                  filteredCoupons.map((coupon) => (
                    <CouponTableRow
                      key={coupon.id}
                      coupon={coupon}
                      onEdit={handleEdit}
                      onDelete={handleDeleteCoupon}
                      onToggleStatus={handleToggleStatus}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className='py-12 text-center text-slate-500'>
                      <div className='flex flex-col items-center gap-2'>
                        <div className='w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center'>
                          <Search className='w-6 h-6 text-slate-400' />
                        </div>
                        <p className='font-medium'>Nenhum cupom encontrado</p>
                        <p className='text-sm'>Tente ajustar os filtros ou criar um novo cupom</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filteredCoupons.length > 0 && (
            <div className='px-6 py-4 border-t border-slate-200 bg-slate-50'>
              <div className='flex items-center justify-between text-sm text-slate-600'>
                <span>
                  Mostrando {filteredCoupons.length} de {coupons.length} cupons
                </span>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={handleExport}
                    className='p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors duration-200'
                    title='Exportar cupons'
                  >
                    <Download className='w-4 h-4' />
                  </button>
                  <button
                    onClick={refreshCoupons}
                    className='p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors duration-200'
                    title='Atualizar lista'
                  >
                    <RefreshCw className='w-4 h-4' />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <CouponForm
          coupon={editingCoupon}
          onSubmit={editingCoupon ? handleUpdateCoupon : handleCreateCoupon}
          onCancel={() => {
            setShowForm(false);
            setEditingCoupon(undefined);
          }}
          isLoading={loading}
        />
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deletingCoupon}
        title='Excluir Cupom'
        message={`Tem certeza que deseja excluir o cupom "${deletingCoupon?.code}"? Esta ação não pode ser desfeita.`}
        confirmText='Excluir'
        cancelText='Cancelar'
        onConfirm={confirmDelete}
        onCancel={() => setDeletingCoupon(undefined)}
        type='danger'
      />
    </div>
  );
};

export default Coupons;
