using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Heppers
{
    public class QueryObject
    {
        public string? Symbol { get; set; } = null; 
        public string? NameCompany { get; set; } = null;
        public string? SortBy { get; set; } = null;
        public bool IsDecsending { get; set; } = false;
        public int pageNumber {get; set; } = 1;
        public int pageSize { get; set; } = 2;
    }
}