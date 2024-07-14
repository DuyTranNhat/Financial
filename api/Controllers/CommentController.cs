using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Dtos.Comment;
using api.Extension;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Service;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace api.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly IStockRepository _stockRepo;
        private readonly ApplicationDBContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IFMPService _fmpService;
        public CommentController(ICommentRepository commentRepository, IStockRepository stockRepo,
         ApplicationDBContext context, UserManager<AppUser> userManager, IFMPService fMPService)
        {
            _userManager = userManager;
            _commentRepo = commentRepository;
            _stockRepo = stockRepo;
            _fmpService = fMPService;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            var UserName = User.GetUsername();
            var appUser = _userManager.FindByNameAsync(UserName);

            var commentList = await _commentRepo.GetAllAsync();
            var commentListDto = commentList.Select(item => item.ToCommentDto());
            return Ok(commentListDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comment = await _commentRepo.GetByIdAsync(id);
            return Ok(comment);
        }

        [HttpPost("{symbol:alpha}")]
        public async Task<IActionResult> create([FromRoute] string symbol, CreateCommentDto commentCreate)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);



            Stock stockExiting = await _stockRepo.getBySymbolAsync(symbol);

            if (stockExiting == null)
            {
                stockExiting = await _fmpService.FindStockBySymbolAsync(symbol);

                if (stockExiting == null)
                {
                    return BadRequest("Stock Not Existed");
                }
                else
                {
                    await _stockRepo.createAsync(stockExiting);
                }
            }

            var userName = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(userName);

            var commentModel = commentCreate.ToCommentFromCreate(stockExiting.Id);
            commentModel.AppUserId = appUser.Id;
            Comment? commentCreated = await _commentRepo.CreateAsync(commentModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = commentCreated.Id }, commentModel.ToCommentDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var commentDeleted = await _commentRepo.DeleteAsync(id);
            if (commentDeleted == null) return NotFound();
            return NoContent();
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> update([FromRoute] int id, [FromBody] UpdateCommentDto updateCommentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var comment = await _commentRepo.UpdateAsync(id, updateCommentDto);
            if (comment == null) return NotFound();

            return Ok(comment.ToCommentDto());
        }
    }
}