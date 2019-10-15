using System;
using System.Collections.Generic;
using System.Text;

namespace Skippit_DAL.Models
{
    public class Order
    {
        public int Id { get; set; }
        public List<Item> Items { get; set; }
    }
}
