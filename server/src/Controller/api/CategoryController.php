<?php

namespace App\Controller\api;

use App\Entity\Category;
use App\Form\CategoryType;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/category')]
final class CategoryController extends AbstractController{
    #[Route(name: 'app_category_index', methods: ['GET'])]
    public function index(CategoryRepository $categoryRepository): Response
    {
        $categories = $categoryRepository->findAll();
        return $this->json($categories, 200, [], [
            'groups' => ['category.all'],
        ]);
    }
    
    #[Route('/{id}', name: 'app_category_show', methods: ['GET'])]
    public function show(Category $category): Response
    {
        return $this->json($category, 200, [], [
            'groups' => ['category.name'],
        ]);
    }

    #[Route('/create', name: 'app_category_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $category = new Category();
        $category->setName($data['name'] ?? null);

        $entityManager->persist($category);
        $entityManager->flush();

        $response = [
            'message' => 'Category created successfully',
            'category' => $category,
        ];

        return $this->json($response, 201, [], [
            'groups' => ['category.all']
        ]);
    }


    #[Route('/{id}/edit', name: 'app_category_edit', methods: ['PUT'])]
    public function edit(Request $request, Category $category, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $category->setName($data['name'] ?? $category->getName());
        $entityManager->flush();
        $response = [
            'message' => 'Category updated successfully',
            'category' => $category,
            ];

        return $this->json($response, 200, [], [
            'groups' => ['category.all']
        ]);
    }

    #[Route('/{id}', name: 'app_category_delete', methods: ['DELETE'])]
    public function delete(Category $category, EntityManagerInterface $entityManager): Response
    {
        $entityManager->remove($category);
        $entityManager->flush();

        $response = [
            'message' => 'Category deleted successfully',
            ];

        return $this->json($response, 200, [], [
            'groups' => ['category.all']
        ]);
    }
}
