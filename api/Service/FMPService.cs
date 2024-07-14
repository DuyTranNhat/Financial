using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Newtonsoft.Json;

namespace api.Service
{
    public class FMPService : IFMPService
    {
        private readonly HttpClient _httpClient;
        public readonly IConfiguration _config;
        public FMPService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }
        
        public async Task<Stock?> FindStockBySymbolAsync(string symbol)
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={_config["FPMKey"]}");

                var content = await result.Content.ReadAsStringAsync();
                var task = JsonConvert.DeserializeObject<FMPStock[]>(content);

                FMPStock stock = task[0];

                if (stock != null)
                {
                    return stock.ToStockFromFMP();
                }
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
            // https://financialmodelingprep.com/api/v3/profile/AAPL?apikey=SmqQpMjGg28k3jlMsIAkwlQule0EiG1z
        }
    }
}