using Assignment3_Backend.Models;
using Assignment3_Backend.ViewModels;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;


namespace Assignment3_Backend.Controllers
{
    [Route("api/store")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly AppDbContext _context; // Assuming you have a database context named "YourDbContext"

        public StoreController(AppDbContext context)
        {
            _context = context;
        }


        // POST: api/store/addproduct
        [HttpPost("addproduct")]
        public ActionResult<Product> AddProduct([FromBody] ProductViewModel productViewModel)
        {
            try
            {
                // Map the properties from the view model to the Product model
                var product = new Product
                {
                    Price = productViewModel.price,
                    ProductTypeId = productViewModel.producttype,
                    BrandId = productViewModel.brand,
                    Description = productViewModel.description,
                    Name = productViewModel.name
                };

                _context.Products.Add(product);
                _context.SaveChanges();

                return CreatedAtAction(nameof(ProductListing), new { id = product.ProductId }, product);
            }
            catch (Exception ex)
            {
                // Handle any errors that may occur during the product creation
                return StatusCode(500, "An error occurred while creating the product.");
            }
        }







        // GET: api/store/productlisting
        [HttpGet("productlisting")]
        public async Task<ActionResult<IEnumerable<Product>>> ProductListing()
        {
            var products = await _context.Products.ToListAsync();

            if (products.Count == 0)
            {
                return NotFound("No products found.");
            }

            return Ok(products);
        }

        // GET: api/store/getbrands
        [HttpGet("getbrands")]
        public ActionResult<IEnumerable<Brand>> GetBrands()
        {
            var brands = _context.Brands.ToList();

            if (brands.Count == 0)
            {
                return NotFound("No brands found.");
            }

            return Ok(brands);
        }

        // GET: api/store/getproducttypes
        [HttpGet("getproducttypes")]
        public ActionResult<IEnumerable<ProductType>> GetProductTypes()
        {
            var productTypes = _context.ProductTypes.ToList();

            if (productTypes.Count == 0)
            {
                return NotFound("No product types found.");
            }

            return Ok(productTypes);
        }
    }
}

