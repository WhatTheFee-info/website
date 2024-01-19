import { Search } from 'iconoir-react';
import { useState } from 'react';

interface SearchInputProps {
  onSearch?: (text: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [searchText, setSearchText] = useState<string>();

  function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    const text = event.target.value;
    setSearchText(text);
    if (onSearch) onSearch(text);
  }

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <Search className="text-slate-500" />
      </div>
      <input
        type="text"
        value={searchText}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search transaction template..."
        required
        onChange={handleTextChange}
      />
    </div>
  );
}
