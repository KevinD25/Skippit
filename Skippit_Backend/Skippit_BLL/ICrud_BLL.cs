using System;
using System.Collections.Generic;
using System.Text;

namespace Skippit_BLL
{
    public interface ICrud_BLL
    {
        string Read();
        void Create();
        void Update();
        void Delete(); 
    }
}
