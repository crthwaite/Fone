<?php
/**
 * Created by PhpStorm.
 * User: christopher
 * Date: 8/01/17
 * Time: 11:52
 */

namespace Fone\TransactionBundle\Manager;

use Fone\CoreBundle\Manager\CoreManager;
use Fone\TransactionBundle\Document\Category;
use Fone\TransactionBundle\Document\Repository\CategoryRepository;

class CategoryManager extends CoreManager
{
    public function findByName($name)
    {
        return $this->getRepository()->findByName($name);
    }

    public function getChildrenCategories($id, &$categories)
    {
        /** @var Category $category */
        $category = $this->getRepository()->find($id);

        if (!is_null($category) and $category instanceof Category) {
            $children = $category->getChildren()->getMongoData();
            if (empty($children)) {
                $categories[] = $category->getName();
            } else {
                foreach ($children as $child) {
                    $this->getChildrenCategories($child->__toString(), $categories);
                }
            }
        }

        return;
    }

    /** @return CategoryRepository */
    protected function getRepository()
    {
        return parent::getRepository();
    }
}