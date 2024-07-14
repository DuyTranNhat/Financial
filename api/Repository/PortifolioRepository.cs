using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class PortifolioRepository : IPortifolioRepository
    {
        private ApplicationDBContext _context;
        public PortifolioRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Portfolio?> CreateAsync(Portfolio portfolio)
        {
            await _context.AddAsync(portfolio);
            await _context.SaveChangesAsync();
            return portfolio;
        }

        public async Task<Portfolio?> DeleteAsync(AppUser appUser, string symbol)
        {
            var portfolioExisting = await _context.portfolios
                .FirstOrDefaultAsync(p => p.AppUserId == appUser.Id 
                && p.Stock.Symbol.ToLower() == symbol.ToLower());

            if(portfolioExisting != null) {
                _context.portfolios.Remove(portfolioExisting);
                await _context.SaveChangesAsync();
            } 
            
            return portfolioExisting;
        }

        public async Task<List<Stock>> GetUserPortfolio(AppUser appUser)
        {
            return await _context.portfolios.Where(u => appUser.Id == appUser.Id).Select(stock => new Stock
            {
                Id = stock.StockId,
                Symbol = stock.Stock.Symbol,
                CompanyName = stock.Stock.CompanyName,
                Purchase = stock.Stock.Purchase,
                LastDiv = stock.Stock.LastDiv,
                Industry = stock.Stock.Industry,
                MarketCap = stock.Stock.MarketCap
            }).ToListAsync();
        }
    }
}