<?php

namespace App\Entity;

// use ApiPlatform\Metadata\ApiResource;
use App\Repository\CategoryRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;


#[ORM\Entity(repositoryClass: CategoryRepository::class)]
// #[ApiResource]
#[UniqueEntity('name')]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product.show', 'product.create','category.all'])]
    private ?int $id = null;

    
    #[ORM\Column(length: 255)]
    #[Assert\Length(min: 4)]
    #[Assert\Regex("/^[A-Z][a-z]*(?:\s[A-Z][a-z]*)*$/", message: "Invalid category name")]
    #[Groups(['product.all','product.show','category.all','category.name'])]
    private ?string $name = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }
}
