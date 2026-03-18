import React from 'react';
import clsx from 'clsx';
import { Edit2, Trash2, Home } from 'lucide-react';

export default function EstateCard({ estate, onEdit, onDelete }) {
  const isAvailable = String(estate.status).toUpperCase() === 'DISPONIBLE' || String(estate.status).toUpperCase() === 'DISPONIBLE';

  return (
    <div className="card outline outline-1 outline-gray-100 flex flex-col group overflow-visible relative">
      <div className="relative h-48 w-full">
        {/* Placeholder image from unsplash for architecture */}
        {estate.image && <img
          src={estate.image}
          alt={estate.title}
          className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
        />}
        {!estate.image && <div className="w-full h-full flex justify-center items-end object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105">
          <Home className="w-[70%] h-[70%] object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105" />
        </div>}

        <div className="absolute top-3 right-3 flex gap-2">
          {onEdit && (
            <button onClick={() => onEdit(estate)} className="p-1.5 bg-white/90 text-gray-700 rounded shadow-sm hover:bg-white hover:text-blue-600 transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(estate.id)} className="p-1.5 bg-white/90 text-gray-700 rounded shadow-sm hover:bg-white hover:text-red-600 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <span className={clsx(
            "px-2 py-1 flex items-center text-xs font-bold rounded shadow-sm tracking-wider capitalize",
            isAvailable ? "bg-accent/20 text-accent border border-accent/30" : "bg-gray-200 text-gray-600 border border-gray-300"
          )}>
            {estate.status}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-primary mb-1">{estate.address || estate.title}</h3>
        {estate.location && <p className="text-sm text-gray-500 mb-4">{estate.location}</p>}

        <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="font-semibold text-primary">
            {!isNaN(Number(estate.price))
              ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(estate.price))
              : estate.price}
          </span>
          <button className={clsx(
            "px-3 py-1.5 text-xs font-semibold rounded-md transition-colors",
            isAvailable ? "bg-accent text-white hover:bg-emerald-600" : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
            disabled={!isAvailable}
          >
            {isAvailable ? 'VENDER' : 'VENDIDO'}
          </button>
        </div>
      </div>
    </div>
  );
}
