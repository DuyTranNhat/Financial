using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Dtos.Comment;
using api.Interfaces;                   
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace api.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController: ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly IStockRepository _stockRepo;
        private readonly ApplicationDBContext _context;
        public CommentController(ICommentRepository commentRepository, IStockRepository stockRepo, ApplicationDBContext context)
        {
            _commentRepo = commentRepository;
            _stockRepo = stockRepo;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            var commentList = await _commentRepo.GetAllAsync();
            var commentListDto = commentList.Select(item => item.ToCommentDto());
            return Ok(commentListDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id) {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comment = await _commentRepo.GetByIdAsync(id);
            return Ok(comment);
        }

        [HttpPost("{stockId:int}")]
        public async Task<IActionResult> create([FromRoute] int stockId, CreateCommentDto commentCreate) {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!await _stockRepo.checkStockExisted(stockId))
                return BadRequest("Stock is not existed");

            var commentModel = commentCreate.ToCommentFromCreate(stockId);
            Comment? commentCreated = await _commentRepo.CreateAsync(commentModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = commentCreated.Id }, commentModel.ToCommentDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteById([FromRoute]int id) {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var commentDeleted = await _commentRepo.DeleteAsync(id);
            if (commentDeleted == null) return NotFound();
            return NoContent();
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> update([FromRoute] int id, [FromBody] UpdateCommentDto updateCommentDto) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var comment = await _commentRepo.UpdateAsync(id, updateCommentDto);
            if (comment == null) return NotFound();

            return Ok(comment.ToCommentDto());
        }
    }
}