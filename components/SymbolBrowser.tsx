import React, { useState, useMemo } from 'react';
import { SYMBOL_CATEGORIES } from '../constants';

interface SymbolBrowserProps {
    onCopy: (text: string) => void;
    searchQuery: string;
}

const SymbolBrowser: React.FC<SymbolBrowserProps> = ({ onCopy, searchQuery }) => {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

    const activeCategory = SYMBOL_CATEGORIES[activeCategoryIndex];

    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) {
            return null; // No search is active
        }
        const lowercasedQuery = searchQuery.toLowerCase();
        
        // Search by category name
        return SYMBOL_CATEGORIES
            .filter(category => category.name.toLowerCase().includes(lowercasedQuery))
            .flatMap(category => category.symbols);

    }, [searchQuery]);


    const renderSymbolGrid = (symbols: string[], keyPrefix: string) => (
        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-10 gap-2">
            {symbols.map((symbol, index) => (
                <button
                    key={`${keyPrefix}-${index}`}
                    onClick={() => onCopy(symbol)}
                    className="flex items-center justify-center bg-gray-800 rounded-lg h-14 text-2xl transition-transform duration-150 ease-in-out hover:bg-indigo-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    aria-label={`Copy symbol ${symbol}`}
                >
                    {symbol}
                </button>
            ))}
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {searchResults ? (
                <>
                    <h2 className="text-lg font-semibold text-gray-300">
                        Results for "{searchQuery}"
                    </h2>
                    {searchResults.length > 0 ? (
                        renderSymbolGrid(searchResults, 'search')
                    ) : (
                        <div className="text-center py-10 text-gray-400">
                            <p>No symbols found.</p>
                            <p className="text-sm">Try searching for a category like "star" or "arrow".</p>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className="relative">
                        <div className="flex flex-wrap gap-2 pb-3">
                            {SYMBOL_CATEGORIES.map((category, index) => (
                                <button
                                    key={category.name}
                                    onClick={() => setActiveCategoryIndex(index)}
                                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 whitespace-nowrap ${
                                        activeCategoryIndex === index
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    {renderSymbolGrid(activeCategory.symbols, activeCategory.name)}
                </>
            )}
        </div>
    );
};

export default SymbolBrowser;