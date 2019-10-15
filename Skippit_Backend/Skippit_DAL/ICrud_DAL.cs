using System;
using System.Collections.Generic;
using System.Text;

namespace Skippit_DAL
{
    public interface ICrud_DAL
    {
        string Read();
        void Create();
        void Update();
        void Delete();
    }
}
