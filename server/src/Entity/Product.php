<?php

namespace App\Entity;

// use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Webmozart\Assert\Assert as AssertAssert;

// #[ApiResource]
#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[UniqueEntity('name')]
#[UniqueEntity('description')]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product.all'])]
    private ?int $id = null;
    
    #[ORM\Column(length: 255)]
    #[Assert\Sequentially([
        new Assert\Length(min: 5),
        new Assert\Regex("/^[a-zA-Z0-9\s\-']{5,100}$/", message: "Invalid product name"),
    ])]
    #[Groups(['product.all', 'product.create'])]
    private ?string $name = null;
    
    #[ORM\Column(length: 255)]
    #[Assert\Length(min: 5)]
    #[Groups(['product.show', 'product.create'])]
    private ?string $description = null;
    
    #[ORM\Column]
    #[Assert\NotBlank()]
    #[Assert\Sequentially([
        new Assert\Regex("/^(0|[1-9]\d*)(\.\d{1,2})?$/", message: "Invalid price"),
        new Assert\Range(
            min: 0.50,
            max: 9999.99,
            notInRangeMessage: 'You must be between {{ min }} euros and {{ max }} euros to enter'
        ),
    ])]
    #[Groups(['product.all', 'product.show', 'product.create'])]
    private ?float $price = null;
    
    #[ORM\Column]
    #[Assert\NotBlank()]
    #[Groups(['product.show'])]
    private ?\DateTimeImmutable $creationAt = null;
    
    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\NotNull(message: 'Category must not be null.')]
    #[Groups(['product.all','product.show','product.create'])]
    private ?Category $category = null;
    
    #[ORM\Column]
    #[Assert\NotBlank()]
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
