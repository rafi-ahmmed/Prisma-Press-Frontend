'use client';

type DislikeBtnProps = {
   slugId: string;
};

const DislikeBtn = ({ slugId }: DislikeBtnProps) => {
   return (
      <div>
         <button>Dislike Btn {slugId}</button>
      </div>
   );
};

export default DislikeBtn;
