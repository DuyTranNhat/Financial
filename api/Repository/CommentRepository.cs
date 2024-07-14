using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _context;
        public CommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Comment?> CreateAsync(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
            return comment;
        }

        public async Task<Comment?> DeleteAsync(int id)
        {
            var commentExisted = await _context.Comments.FirstOrDefaultAsync(item => item.Id == id);
            if (commentExisted != null)
            {
                _context.Comments.Remove(commentExisted);
                await _context.SaveChangesAsync();
            }

            return commentExisted;
        }

        public async Task<List<Comment>> GetAllAsync()
        {
            return await _context.Comments.Include(c => c.AppUser).ToListAsync();
        }

        public async Task<Comment?> GetByIdAsync(int id)
        {
            return await _context.Comments.Include(c => c.AppUser).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Comment?> UpdateAsync(int id, UpdateCommentDto comment)
        {
            Comment? commentExisting =  await _context.Comments.FirstOrDefaultAsync(item => item.Id == id);

            if (commentExisting != null) {
                commentExisting.Title = comment.Title;
                commentExisting.Content = comment.Content;
                _context.SaveChanges();
            }

            return commentExisting;
        }
    }
}