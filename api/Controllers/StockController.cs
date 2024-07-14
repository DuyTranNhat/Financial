using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Stock;
using api.Heppers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly ILogger<StockController> _logger;
        private readonly ApplicationDBContext _context;
        private readonly IStockRepository _stockRepo;

        public StockController(ILogger<StockController> logger, ApplicationDBContext context, IStockRepository stockRepo)
        {
            _logger = logger;
            _context = context;
            _stockRepo = stockRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> getAll([FromQuery] QueryObject queryObj)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var stocks = await _stockRepo.getAllAsync(queryObj);
            var stockDto = stocks.Select(s => s.ToStockDto()).ToList();
            return Ok(stockDto);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> getById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var stockModel = await _stockRepo.getByIdAsync(id);

            if (stockModel == null) return NotFound();

            return Ok(stockModel);
        }



        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStockrequestDto stockDto)
        {
            if(!ModelState.IsValid) {
                return BadRequest(ModelState);
            }
            var stockModel = stockDto.ToStockFromCreateDTO();

            await _stockRepo.createAsync(stockModel);
            return CreatedAtAction(nameof(getById), new { id = stockModel.Id }, stockModel.ToStockDto());
        }

        // [HttpPut]
        // public 
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateStockRequestDto updateDto) {
            if(!ModelState.IsValid) 
                return BadRequest(ModelState);

            Stock? stockModel = await _stockRepo.updateAsync(id, updateDto);
            if (stockModel == null) return NotFound();
            return Ok(stockModel.ToStockDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id) {
            Stock? stockModel = await _stockRepo.deleteAsync(id);
            if (stockModel == null) return NotFound();
            return NoContent();
        }
    }
}