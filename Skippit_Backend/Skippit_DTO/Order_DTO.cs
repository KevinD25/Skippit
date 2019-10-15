using System;
using System.Collections.Generic;
using System.Text;

namespace Skippit_DTO
{
    public class Order_DTO
    {
        public int Id { get; set; }
        public List<Item_DTO> Items { get; set; }
    }
}
