using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.Heppers;
using api.Models;

namespace api.Interfaces
{
    public interface IStockRepository
    {
        Task<List<Stock>> getAllAsync(QueryObject queryObj);
        Task<Stock?> getByIdAsync(int id);
        Task<Stock?> getBySymbolAsync(string symbol);
        Task<Stock> createAsync(Stock stockModel);

        Task<Stock?> deleteAsync(int id);
        Task<Stock?> updateAsync(int id, UpdateStockRequestDto stockRequestDto);
        Task<bool> checkStockExisted(int id);
    }
}