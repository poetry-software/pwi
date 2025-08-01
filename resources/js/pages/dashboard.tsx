import { Navigation } from '@/components/navigation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Head } from '@inertiajs/react';
import { AlertCircle, Bell, Check, ChevronDown, ChevronsUpDown, ChevronUp, Columns, Plus, RefreshCw, Search } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [visibleColumns, setVisibleColumns] = useState(['id', 'subject', 'impactedAccount', 'category', 'subcategory', 'created', 'status']);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Head title="Dashboard" />
      <Header />
      <main className="container mx-auto p-6">
        <Navigation />
        <section className="pt-6">
          <Notice />
          <TableButtons
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <Table
            selectedStatus={selectedStatus}
            sortColumn={sortColumn}
            setSortColumn={setSortColumn}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            visibleColumns={visibleColumns}
            searchTerm={searchTerm}
          />
        </section>
      </main>
    </div>
  );
}

function Notice() {
  return (
    <div>
      <div className="relative rounded-md border border-gray-200 bg-gradient-to-r from-cyan-50 to-purple-100 p-2 shadow-sm">
        <div className="absolute top-0 left-0 h-full w-1 rounded-l-md bg-primary"></div>

        <div className="flex items-center space-x-3 pl-4">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
            <AlertCircle className="h-6 w-6 text-white" />
          </div>

          <p className="text-sm text-gray-800">
            This view shows Tickets created from PWI and sent to DIXA. The conversation happens between the PWI Partner account and DIXA Agent.
          </p>
        </div>
      </div>
    </div>
  );
}

function TableButtons({
  selectedStatus,
  setSelectedStatus,
  visibleColumns,
  setVisibleColumns,
  searchTerm,
  setSearchTerm,
}: {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  visibleColumns: string[];
  setVisibleColumns: (columns: string[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRefresh = () => {
    setIsAnimating(true);
    setRefreshKey((prev) => prev + 1);
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const columnOptions = [
    { value: 'id', label: 'Ticket ID' },
    { value: 'subject', label: 'Subject' },
    { value: 'impactedAccount', label: 'Impacted Account' },
    { value: 'category', label: 'Category' },
    { value: 'subcategory', label: 'Subcategory' },
    { value: 'created', label: 'Created' },
    { value: 'status', label: 'Status' },
  ];

  return (
    <div className="flex items-center justify-between py-6">
      <div className="flex items-center space-x-3">
        <Button className="bg-primary text-white hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Ticket
        </Button>
        <button
          onClick={handleRefresh}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-400 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <RefreshCw key={refreshKey} className={`h-4 w-4 ${isAnimating ? 'animate-spin-once' : ''}`} />
          Refresh
        </button>
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-400 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                <Columns className="h-4 w-4" />
                Columns
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 p-1">
              <div className="max-h-60 overflow-auto">
                {columnOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex cursor-pointer items-center space-x-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                    onClick={() => {
                      const newValue = visibleColumns.includes(option.value)
                        ? visibleColumns.filter((v) => v !== option.value)
                        : [...visibleColumns, option.value];
                      setVisibleColumns(newValue);
                    }}
                  >
                    <Checkbox
                      checked={visibleColumns.includes(option.value)}
                      onChange={() => {
                        const newValue = visibleColumns.includes(option.value)
                          ? visibleColumns.filter((v) => v !== option.value)
                          : [...visibleColumns, option.value];
                        setVisibleColumns(newValue);
                      }}
                    />
                    <span className="flex-1">{option.label}</span>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-primary/20 pl-10 text-black caret-black focus:border-primary/40 focus:ring-primary/20"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-32 text-black">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
            <Check className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Partner Hub</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">1</span>
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3 rounded-lg bg-gray-100 px-3 py-2 transition-transform hover:-translate-y-0.5 hover:border-gray-400 hover:bg-gray-200">
              <span className="text-sm font-medium text-gray-900">John Doe</span>
              <Avatar className="h-6 w-6 bg-gray-800">
                <AvatarFallback className="bg-gray-900 text-xs font-semibold text-white">JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Table({
  selectedStatus,
  sortColumn,
  setSortColumn,
  sortDirection,
  setSortDirection,
  visibleColumns,
  searchTerm,
}: {
  selectedStatus: string;
  sortColumn: string | null;
  setSortColumn: (column: string | null) => void;
  sortDirection: 'asc' | 'desc';
  setSortDirection: (direction: 'asc' | 'desc') => void;
  visibleColumns: string[];
  searchTerm: string;
}) {
  const tableData = [
    {
      id: '#480771',
      subject: 'FTP Connection Timeout Issue',
      impactedAccount: 'ACC-10234',
      category: 'FTP',
      subcategory: 'File Transferring',
      created: 'Jun 10, 2025',
      status: 'Closed',
    },
    {
      id: '#521247',
      subject: 'Double Billing Issue',
      impactedAccount: 'billing@company.com',
      category: 'Billing',
      subcategory: 'Invoice',
      created: 'Jun 17, 2025',
      status: 'Open',
    },
    {
      id: '#508301',
      subject: '500 Internal Server Error',
      impactedAccount: 'ACC-45678',
      category: 'Web',
      subcategory: '404/5 Errors',
      created: 'Jun 11, 2025',
      status: 'Closed',
    },
  ];

  const filteredData = selectedStatus === 'all' ? tableData : tableData.filter((row) => row.status.toLowerCase() === selectedStatus.toLowerCase());

  const searchFilteredData =
    searchTerm.trim() === ''
      ? filteredData
      : filteredData.filter((row) => {
          for (const column of visibleColumns) {
            const value = row[column as keyof typeof row];
            if (value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
              return true;
            }
          }
          return false;
        });

  const sortedData = [...searchFilteredData].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn as keyof typeof a];
    const bValue = b[sortColumn as keyof typeof b];

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Closed':
        return 'bg-lime-100 text-lime-900';
      case 'Open':
        return 'bg-yellow-100 text-yellow-900';
      default:
        return 'bg-gray-100 text-gray-900';
    }
  };

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return <ChevronsUpDown className="h-3 w-3 text-gray-600" />;
    }
    return sortDirection === 'asc' ? <ChevronUp className="h-3 w-3 text-gray-600" /> : <ChevronDown className="h-3 w-3 text-gray-600" />;
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-lg shadow-gray-200/50">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {visibleColumns.includes('id') && (
              <th
                className="cursor-pointer px-4 py-3 text-left text-xs font-bold tracking-wider text-gray-800 uppercase hover:bg-gray-100"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center space-x-1">
                  <span>TICKET ID</span>
                  {getSortIcon('id')}
                </div>
              </th>
            )}
            {visibleColumns.includes('subject') && (
              <th
                className="cursor-pointer px-4 py-3 text-left text-xs font-bold tracking-wider text-gray-800 uppercase hover:bg-gray-100"
                onClick={() => handleSort('subject')}
              >
                <div className="flex items-center space-x-1">
                  <span>SUBJECT</span>
                  {getSortIcon('subject')}
                </div>
              </th>
            )}
            {visibleColumns.includes('impactedAccount') && (
              <th
                className="cursor-pointer px-4 py-3 text-left text-xs font-bold tracking-wider text-gray-800 uppercase hover:bg-gray-100"
                onClick={() => handleSort('impactedAccount')}
              >
                <div className="flex items-center space-x-1">
                  <span>IMPACTED ACCOUNT</span>
                  {getSortIcon('impactedAccount')}
                </div>
              </th>
            )}
            {visibleColumns.includes('category') && (
              <th
                className="cursor-pointer px-4 py-3 text-left text-xs font-bold tracking-wider text-gray-800 uppercase hover:bg-gray-100"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center space-x-1">
                  <span>CATEGORY</span>
                  {getSortIcon('category')}
                </div>
              </th>
            )}
            {visibleColumns.includes('subcategory') && (
              <th
                className="cursor-pointer px-4 py-3 text-left text-xs font-bold tracking-wider text-gray-800 uppercase hover:bg-gray-100"
                onClick={() => handleSort('subcategory')}
              >
                <div className="flex items-center space-x-1">
                  <span>SUBCATEGORY</span>
                  {getSortIcon('subcategory')}
                </div>
              </th>
            )}
            {visibleColumns.includes('created') && (
              <th
                className="cursor-pointer px-4 py-3 text-left text-xs font-bold tracking-wider text-gray-800 uppercase hover:bg-gray-100"
                onClick={() => handleSort('created')}
              >
                <div className="flex items-center space-x-1">
                  <span>CREATED</span>
                  {getSortIcon('created')}
                </div>
              </th>
            )}
            {visibleColumns.includes('status') && (
              <th
                className="cursor-pointer px-4 py-3 text-left text-xs font-bold tracking-wider text-gray-800 uppercase hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>STATUS</span>
                  {getSortIcon('status')}
                </div>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {sortedData.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {visibleColumns.includes('id') && <td className="px-4 py-3 text-sm font-medium whitespace-nowrap text-gray-900">{row.id}</td>}
              {visibleColumns.includes('subject') && <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900">{row.subject}</td>}
              {visibleColumns.includes('impactedAccount') && (
                <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900">{row.impactedAccount}</td>
              )}
              {visibleColumns.includes('category') && <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900">{row.category}</td>}
              {visibleColumns.includes('subcategory') && <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900">{row.subcategory}</td>}
              {visibleColumns.includes('created') && <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-900">{row.created}</td>}
              {visibleColumns.includes('status') && (
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex rounded-sm p-2 text-xs font-bold ${getStatusColor(row.status)}`}>{row.status}</span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
