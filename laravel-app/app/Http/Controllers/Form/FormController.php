<?php

namespace App\Http\Controllers\Form;

use App\Events\FormSubmitted;
use App\Http\Controllers\Controller;
use App\Http\Requests\Form\FormRequests;
use App\Http\Resources\Form\FormResource;
use App\Models\Form;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class FormController extends Controller
{
    public function index()
    {
        try {
            /** @var Form $forms */
            //Formu dolduran kişi lazım olur diye with.
            $forms = Form::query()->with('user')->paginate(10);
            return FormResource::collection($forms);
        } catch (\Throwable $exception) {
            return $this->error($exception->getMessage());
        }
    }

    public function store(FormRequests $request): JsonResponse
    {
        try {

            /** @var User $user */
            $user = auth()->user();

            /** @var Form $forms */
            $form = $user->forms()->create($request->except(['fullUrl']));
            throw_unless($form, \Exception::class, 'Form kaydedilirken bir sorun oluştu.');

            event(new FormSubmitted($request->fullUrl, $request->getClientIp()));
            return $this->success('Form başarıyla gönderildi.');
        } catch (\Throwable $exception) {
            return $this->error($exception->getMessage());

        }
    }
}
