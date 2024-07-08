using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Comment
{
    public class CreateCommentDto
    {
        [Required]
        [MinLength(5, ErrorMessage = "Title of the comment requires at least 5 characteers")]
        [MaxLength(280, ErrorMessage = "Title of the comment limited 280 characters")]
        public string Title { get; set; }
        [Required]
        [MinLength(5, ErrorMessage = "Content of the comment requires at least 5 characteers")]
        [MaxLength(280, ErrorMessage = "Content of the comment limited 280 characters")]
        public string Content { get; set; }
    }
}