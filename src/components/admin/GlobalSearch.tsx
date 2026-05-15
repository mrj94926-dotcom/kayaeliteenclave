"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchResult {
  type: string;
  title: string;
  subtitle: string;
  url: string;
}

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setLoading(true);
        try {
          const res = await fetch(`/api/admin/search?q=${encodeURIComponent(query)}`);
          const data = await res.json();
          if (data.results) {
            setResults(data.results);
            setIsOpen(true);
          }
        } catch (e) {
          console.error("Failed to search", e);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="relative w-96 group" ref={dropdownRef}>
      <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isOpen || query ? 'text-[#D4AF37]' : 'text-slate-400 group-focus-within:text-[#D4AF37]'}`} size={18} />
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => { if(results.length > 0) setIsOpen(true); }}
        placeholder="Search CRM intelligence..." 
        className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-12 pr-10 text-sm focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white focus:shadow-lg focus:shadow-[#D4AF37]/5 transition-all text-[#0F172A] placeholder:text-slate-400"
      />
      {loading && (
        <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-slate-400" size={16} />
      )}
      
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 max-h-[400px] overflow-y-auto">
          {results.map((result, idx) => (
            <Link 
              key={idx} 
              href={result.url}
              onClick={() => setIsOpen(false)}
              className="flex flex-col p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors last:border-0 cursor-pointer"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-bold text-[#0F172A]">{result.title}</span>
                <span className="text-[9px] uppercase tracking-widest font-black px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">{result.type}</span>
              </div>
              <span className="text-xs text-slate-500 truncate">{result.subtitle}</span>
            </Link>
          ))}
        </div>
      )}
      
      {isOpen && !loading && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 text-center z-50 text-slate-500 text-sm">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
}
