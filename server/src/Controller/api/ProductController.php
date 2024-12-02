<?php

namespace App\Controller\api;

use App\Entity\Product;
use App\Entity\Category;
use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;


#[Route('/api/product')]
final class ProductController extends AbstractController{
    #[Route(name: 'app_product_index', methods: ['GET'])]
    public function index(ProductRepository $productRepository): Response
    {
        $products = $productRepository->findAll();
        return $this->json($products, 200, [], [
            'groups' => ['product.all'],
        ]);
    }

    #[Route('/{id}', name: 'app_product_show', methods: ['GET'])]
    public function show(Product $product): Response
    {
        return $this->json($product, 200, [], [
            'groups' => ['product.all','product.show']
            ]);
    }


    #[Route('/create', name: 'app_product_new', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $entityManager,
        CategoryRepository $categoryRepository
    ): Response {
        $data = json_decode($request->getContent(), true);
    
        // Vérification si la catégorie est définie
        if (!isset($data['category'])) {
            return $this->json(['error' => 'Category is required.'], 400);
        }
    
        // Recherche de la catégorie par ID
        $category = $categoryRepository->find($data['category']);
        if (!$category) {
            return $this->json(['error' => 'Category not found.'], 404);
        }
    
        // Création du produit
        $product = new Product();
        $product->setName($data['name'] ?? null);
        $product->setDescription($data['description'] ?? null);
        $product->setPrice($data['price'] ?? null);
        $product->setCategory($category);
        $product->setCreationAt(new \DateTimeImmutable());
        $product->setUpdateAt(new \DateTimeImmutable());
    
        // Sauvegarde
        $entityManager->persist($product);
        $entityManager->flush();

        $response = [
            'message' => 'Product created successfully.',
            'product' => $product,
        ];
    
        return $this->json($response, 201, [], [
            'groups' => ['product.all', 'product.show']
        ]);
    }


    #[Route('/{id}/edit', name: 'app_product_edit', methods: ['PUT'])]
    public function edit(Request $request,Product $product , CategoryRepository $repository, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $product->setUpdateAt(new \DateTimeImmutable());
        $product->setName($data['name'] ?? $product->getName())
        ->setDescription($data['description'] ?? $product->getDescription())
        ->setPrice($data['price'] ?? $product->getPrice());
        
        if (isset($data['category_id'])) {
            $category = $entityManager->getRepository(Category::class)->find($data['category_id']);
            if ($category) {
                $product->setCategory($category);
            }
        }

        $entityManager->flush();
        $response = [
            'message' => 'Product updated successfully',
            'product' => $product
        ];
        return $this->json($response, 200, [], [
            'groups' => ['product.all', 'product.show']
            ]);
    }

    #[Route('/{id}', name: 'app_product_delete', methods: ['DELETE'])]
    public function delete(Product $product, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($product);
        $entityManager->flush();

        $response = [
            'message' => 'Product deleted successfully',
            ];
        
            return $this->json($response, 200, [], [
                'groups' => ['product.all', 'product.show']
                ]);
    }
}
