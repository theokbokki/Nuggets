<div class="image-stack">
    <div class="image-stack__bg"></div>
    <div class="image-stack__images">
        @for($i = 0; $i < 6; $i++)
            <img src="{{ Vite::asset('resources/img/components/image-stack/'.$i.'.webp') }}" alt="" class="image-stack__img image-stack__img--{{$i}}"/>
        @endfor
    </div>
</div>
