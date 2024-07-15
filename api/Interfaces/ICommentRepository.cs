using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Heppers;
using api.Models;

namespace api.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllAsync(CommentQueryObject commentQueryObject);
        Task<Comment?> GetByIdAsync(int id);
        Task<Comment?> CreateAsync(Comment comment);
        Task<Comment?> DeleteAsync(int id);
        Task<Comment?> UpdateAsync(int id, UpdateCommentDto comment);    
    }
}