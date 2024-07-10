using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Stock;
using api.Heppers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class StockRepository : IStockRepository
    {
        private readonly ApplicationDBContext _context;
        public StockRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<bool> checkStockExisted(int id)
        {
            return await _context.Stocks.AnyAsync(x => x.Id == id);
        }

        public async Task<Stock> createAsync(Stock stockModel)
        {
            await _context.Stocks.AddAsync(stockModel);
            await _context.SaveChangesAsync();
            return stockModel;
        }

        public async Task<Stock?> deleteAsync(int id)
        {
            Stock? stockExisting = await _context.Stocks.FirstOrDefaultAsync(stock => stock.Id == id);
            if (stockExisting != null)
            {
                _context.Stocks.Remove(stockExisting);
                await _context.SaveChangesAsync();
            }
            return stockExisting;
        }

        public async Task<List<Stock>> getAllAsync(QueryObject queryObj)
        {
            var stock = _context.Stocks.Include(s => s.Comments).AsQueryable();

            if (!string.IsNullOrWhiteSpace(queryObj.Symbol)) {
                stock = stock.Where(s => s.Symbol.Contains(queryObj.Symbol)); 
            } 
            if (!string.IsNullOrWhiteSpace(queryObj.NameCompany)) {
                stock = stock.Where(s => s.CompanyName.Contains(queryObj.NameCompany));
            } 

            if (!string.IsNullOrWhiteSpace(queryObj.SortBy)) {
                stock = queryObj.IsDecsending ? stock.OrderByDescending(s => s.Symbol) : stock.OrderBy(s => s.Symbol);
            } 

            int skipByPage = (queryObj.pageNumber - 1) * queryObj.pageSize;
             
            return await stock.Skip(skipByPage).Take(queryObj.pageSize).ToListAsync();
        }

        public async Task<Stock?> getByIdAsync(int id)
        {
            return await _context.Stocks.Include(s => s.Comments).FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Stock?> getBySymbolAsync(string symbol)
        {
            return await _context.Stocks.FirstOrDefaultAsync(s => s.Symbol.ToLower() == symbol.ToLower());
        }

        public async Task<Stock?> updateAsync(int id, UpdateStockRequestDto stockRequestDto0)
        {
            Stock? stockExisting = _context.Stocks.FirstOrDefault(stock => stock.Id == id);

            if (stockExisting != null)
            {
                stockExisting.Symbol = stockRequestDto0.Symbol;
                stockExisting.CompanyName = stockRequestDto0.CompanyName;
                stockExisting.Purchase = stockRequestDto0.Purchase;
                stockExisting.LastDiv = stockRequestDto0.LastDiv;
                stockExisting.Industry = stockRequestDto0.Industry;
                stockExisting.MarketCap = stockRequestDto0.MarketCap;
            }
            
            await _context.SaveChangesAsync();
            return stockExisting;
        }
    }
}