<?php 

namespace App\Service;

use Symfony\Component\Validator\ConstraintViolationListInterface;

class ValidatorErrorService 
{
  public function formatValidationErrors(ConstraintViolationListInterface $violations): array {
    $errors = [];
    foreach ($violations as $violation) {
      $errors[$violation->getPropertyPath()] = $violation->getMessage(); 
    }
    return $errors;
  }
}