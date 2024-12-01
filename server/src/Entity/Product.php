<?php

namespace App\Entity;

// use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
// #[ApiResource]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product.all'])]
    private ?int $id = null;
    
    #[ORM\Column(length: 255)]
    #[Groups(['product.all', 'product.create'])]
    private ?string $name = null;
    
    #[ORM\Column(length: 255)]
    #[Groups(['product.show', 'product.create'])]
    private ?string $description = null;
    
    #[ORM\Column]
    #[Groups(['product.all', 'product.show', 'product.create'])]
    private ?float $price = null;

    #[ORM\Column]
    #[Groups(['product.show'])]
    private ?\DateTimeImmutable $creationAt = null;
    
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['product.all','product.show','product.create'])]
    private ?Category $category = null;
    
    #[ORM\Column]
    #[Groups(['product.show'])]
    private ?\DateTimeImmutable $updateAt = null;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getCreationAt(): ?\DateTimeImmutable
    {
        return $this->creationAt;
    }

    public function setCreationAt(\DateTimeImmutable $creationAt): static
    {
        $this->creationAt = $creationAt;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getUpdateAt(): ?\DateTimeImmutable
    {
        return $this->updateAt;
    }

    public function setUpdateAt(\DateTimeImmutable $updateAt): static
    {
        $this->updateAt = $updateAt;

        return $this;
    }
}
