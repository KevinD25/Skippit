using System;
using System.Collections.Generic;
using System.Text;

namespace Skippit_DTO
{
    public class User_DTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime Birthdate { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public List<Establishment_DTO> Recent { get; set; }
        public List<Establishment_DTO> Favorites { get; set; }
        public List<Order_DTO> OrderHistory { get; set; }
        public int Tokens { get; set; }
        //public string Username { get; set; }
    }
}
